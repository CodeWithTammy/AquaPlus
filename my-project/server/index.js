// server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";
import CustomerPackage from "./models/CustomerPackage.js";
import Service from "./models/Service.js";
import ServiceDetails from "./models/ServiceDetails.js";
import Rental from "./models/Rental.js";
import RequestService from "./models/RequestService.js";
import RentalRequest from "./models/RentalRequest.js";
import {
  sendServiceRequestEmail,
  sendSubscriptionEmail,
  sendRentalRequestEmail,
  sendContactEmail,
  sendSubscriptionConfirmation,
  sendRentalConfirmation,
  sendServiceRequestConfirmation,
  subscriptionActiveEmail,
  subscriptionCancelEmail,
} from "./emailservice/emailservice.js";
import { body, param, validationResult } from "express-validator";




// import authRoutes from "./auth.js";
// import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
// import { authMiddleware } from "./authmiddleware.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);
// app.use(cookieParser());
app.use(express.json());
app.use(helmet()); // security headers

// Rate limiter specifically for POST routes
const postLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 requests per IP per 15 minutes
  message: { error: "Too many requests, please try again later." },
});

// app.use("/adminsignin", loginLimiter);

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "rentals",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });

// HTTP + Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Socket.io watcher
const watchRequests = () => {
  const changeStream = RequestService.watch();

  changeStream.on("change", async (change) => {
    console.log("Change detected:", change);

    if (
      change.operationType === "insert" ||
      change.operationType === "update"
    ) {
      try {
        const doc = await RequestService.findById(change.documentKey._id);
        io.emit("requestUpdated", doc);
      } catch (err) {
        console.error("Error fetching document:", err);
      }
    }
  });

  changeStream.on("error", (err) => {
    console.error("ChangeStream error, reconnecting in 5s:", err);
    setTimeout(watchRequests, 5000);
  });

  changeStream.on("close", () => {
    console.log("ChangeStream closed, reconnecting in 5s...");
    setTimeout(watchRequests, 5000);
  });
};
watchRequests();

// Routes
// app.use("/", authRoutes); // login/logout

// --------ROUTES-----------
// -------GET SERVICES----------
//tested
app.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------GET SERVICES BY ID-----------------
//tested
app.get(
  "/services/:title",
  [
    param("title")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Invalid service title"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const title = req.params.title.replace(/-/g, " ");
      const service = await Service.findOne({ title });
      const details = await ServiceDetails.findOne({ title });

      if (!service && !details) {
        return res.status(404).json({ error: "Service or details not found" });
      }

      res.json({
        ...(service ? service.toObject() : {}),
        ...(details ? details.toObject() : {}),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error fetching service" });
    }
  }
);



// --------------GET RENTALS--------------
//tested
app.get("/rentals", async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.json(rentals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching rentals" });
  }
});

// -----------POSTING RENTALS TO FRONT END FROM ADMIN SCREEN----------------
//Tested
// Protected & validated rental creation
app.post(
  "/rentals",
  upload.single("image"),
  [
    body("name").trim().notEmpty().escape().withMessage("Name is required"),
    body("price").trim().notEmpty().matches(/^\d+JMD\/week$/).withMessage("Price must be in the format '50JMD/week'"),
    body("desc").trim().escape(),
    body("amount")
      .isInt({ min: 0 })
      .withMessage("Amount must be a positive integer"),
  ],
  postLimiter, async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Sanitize and save data safely
      const newRental = new Rental({
        name: req.body.name,
        price: req.body.price,
        desc: req.body.desc,
        amount: req.body.amount,
        image: req.file ? req.file.path : "", // multer handles file safely
      });

      await newRental.save();

      //  Respond safely
      res
        .status(201)
        .json({ message: "Rental added safely", rental: newRental });
    } catch (err) {
      console.error("Error adding rental:", err);
      res.status(500).json({ error: "Failed to add rental" });
    }
  }
);

//----------DELETE RENTAL--------------
//Tested
app.delete(
  "/rentals/:id",
  [param("id").isMongoId().withMessage("Invalid rental ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const rental = await Rental.findByIdAndDelete(req.params.id);
      if (!rental) return res.status(404).json({ error: "Rental not found" });
      res.json({ message: "Rental deleted successfully", id: req.params.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete rental" });
    }
  }
);

//----------------------GET RENTAL REQUEST-----------------
// tested
app.get("/rentalrequest", async (req, res) => {
  try {
    const rentalRequests = await RentalRequest.find();
    res.json(rentalRequests);
  } catch (err) {
    console.error("Error fetching rental requests:", err);
    res.status(500).json({ error: err.message });
  }
});

// -----------------GET RENTAL REQUEST BY ID----------------
//tested
app.get(
  "/rentalrequest/:id",
  [param("id").isMongoId().withMessage("Invalid rental request ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const rentalRequest = await RentalRequest.findById(req.params.id);
      if (!rentalRequest)
        return res.status(404).json({ error: "Rental request not found" });
      res.json(rentalRequest);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error fetching rental request" });
    }
  }
);
// ------------POST USER RENTAL REQUEST------------------------
//tested
app.post(
  "/rentalrequest",
[
    body("tool").trim().escape(),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("name").trim().escape(),
    body("address").trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("startDate").isISO8601().withMessage("Invalid start date"), // remove .toDate()
    body("phone").trim().escape(),
    body("weeks").isInt({ min: 1 }).withMessage("Weeks must be at least 1"),
    body("total").isFloat({ min: 0 }).withMessage("Total must be a positive number"),
  ], postLimiter,
  async (req, res) => {
     console.log("Received body:", req.body); 
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const rentalrequest = new RentalRequest(req.body);
      await rentalrequest.save();
      io.emit("requestUpdated", rentalrequest);
      await sendRentalRequestEmail(rentalrequest).catch(() =>
        console.error("Business email failed")
      );
      await sendRentalConfirmation(rentalrequest).catch(() =>
        console.error("Confirmation email failed")
      );
      res.status(201).json({ message: "Rental request submitted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error saving rental request" });
    }
  }
);

//------------DELETE RENTAL REQUEST----------
app.delete(
  "/rentalrequest/:id",
  [param("id").isMongoId().withMessage("Invalid rental request ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const rentalrequest = await RentalRequest.findByIdAndDelete(req.params.id);
      if (!rentalrequest) return res.status(404).json({ error: "Rental request not found" });
      res.json({ message: "Rental request deleted successfully", id: req.params.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete rental request" });
    }
  }
);
//-------------SEND UPDATE ON RENTAL REQUEST--------------
// tested

app.patch(
  "/rentalrequest/:id",
  [
    body("status")
      .trim()
      .isIn(["Pending", "Completed"])
      .withMessage("Invalid status value")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const updated = await RentalRequest.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      if (!updated) return res.status(404).json({ message: "Not found" });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);
//----------DELETE RENTAL REQUEST--------------
app.delete(
  "/rentalrequest/:id",
  [param("id").isMongoId().withMessage("Invalid service request ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const requestservice = await RequestService.findByIdAndDelete(req.params.id);
      if (!requestservice) return res.status(404).json({ error: "Service Request not found" });
      res.json({ message: "Service Request deleted successfully", id: req.params.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete service request" });
    }
  }
);


// ---------------POST USER SERVICE REQUEST---------------
// tested
app.post(
  "/requestservices",
   [
    body("full_name")
      .trim()
      .notEmpty()
      .escape()
      .withMessage("Full name is required"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required"),
    body("phone")
      .trim()
      .notEmpty()
      .escape()
      .withMessage("Phone number is required"),
    body("address")
      .trim()
      .notEmpty()
      .escape()
      .withMessage("Address is required"),
    body("service")
      .trim()
      .notEmpty()
      .escape()
      .withMessage("Service type is required"),
    body("date")
      .isISO8601()
      .withMessage("Invalid date format"),
    body("time")
      .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
      .withMessage("Time must be in HH:MM 24-hour format"),
    body("message")
      .trim()
      .escape(),
  ],postLimiter,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const request = new RequestService(req.body);
      await request.save();
      io.emit("requestUpdated", request);

      await sendServiceRequestEmail(request).catch(() => console.error("Business email failed"));
      await sendServiceRequestConfirmation(request).catch(() => console.error("Confirmation email failed"));

      res.status(201).json({ message: "Request submitted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error saving request" });
    }
  }
);

// ---------GET SERVICE REQUESTS---------------
//tested
app.get("/requestservices", async (req, res) => {
  try {
    const requests = await RequestService.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------GET SERVICE REQUEST BY ID-------------------
//tested
app.get(
  "/requestservices/:id",
  [param("id").isMongoId().withMessage("Invalid request ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const request = await RequestService.findById(req.params.id);
      if (!request) return res.status(404).json({ error: "Request not found" });
      res.json(request);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error fetching request" });
    }
  }
);
// ----------------SEND UPDATE TO REQUEST SERVICES----------------
//tested
app.patch(
  "/requestservices/:id",
  [
    param("id").isMongoId().withMessage("Invalid request ID"),
    body("status").trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const updated = await RequestService.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: "Request not found" });
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error updating request" });
    }
  }
);



//-------------------Subscriptions---------------------
// ----------------GET USER SUBSCRIPTIONS----------------
//tested
app.get("/subscriptions", async (req, res) => {
  try {
    const subscriptions = await CustomerPackage.find();
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------GET USER SUBSCRIPTIONS BY ID----------------------
//tested
app.get(
  "/subscriptions/:id",
  [param("id").isMongoId().withMessage("Invalid subscription ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const subscription = await CustomerPackage.findById(req.params.id);
      if (!subscription) return res.status(404).json({ error: "Subscription not found" });
      res.json(subscription);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error fetching subscription" });
    }
  }
);

// ---------------POST USER SUBSCRIPTIONS----------------
//tested
app.post(
  "/subscriptions",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("phone").trim().notEmpty().withMessage("Phone is required"),
    body("address").trim().notEmpty().withMessage("Address is required"),
    body("plan").trim().notEmpty().withMessage("Plan is required"),
    body("status").optional().trim().escape(),          // 👈 optional
    body("planactive").optional().trim().escape(),      // 👈 optional
    body("contactStatus").optional().trim().escape(),   // 👈 optional
    body("activationDate").optional().isISO8601().withMessage("Invalid date"),
    body("renewalDate").optional().isISO8601().withMessage("Invalid date"),
  ],
  postLimiter,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const data = { ...req.body };

      // Strip out empty string values (so defaults kick in)
      ["status", "planactive", "contactStatus"].forEach((field) => {
        if (data[field] === "" || data[field] === null || data[field] === undefined) {
          delete data[field];
        }
      });

      const customerPackage = new CustomerPackage(data);
      await customerPackage.save();

      io.emit("Customer Added", customerPackage);

      await sendSubscriptionEmail(customerPackage).catch(() =>
        console.error("Business email failed")
      );
      await sendSubscriptionConfirmation(customerPackage).catch(() =>
        console.error("Confirmation email failed")
      );

      res.status(201).json({ message: "Subscription submitted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error saving subscription" });
    }
  }
);


// -----------------SEND UPDATE FOR USER---------------
//tested
// -----------------SEND UPDATE FOR USER---------------
app.patch(
  "/subscriptions/:id",
  [
    param("id").isMongoId().withMessage("Invalid subscription ID"),
    body("status").optional().trim().escape(),
    body("planactive").optional().trim().escape(),
    body("contactStatus").optional().trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      // Build update object only with fields that are provided
      const updateData = {};
      ["status", "planactive", "contactStatus"].forEach((field) => {
        if (req.body[field] !== undefined && req.body[field] !== "") {
          updateData[field] = req.body[field];
        }
      });

      const updated = await CustomerPackage.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updated) return res.status(404).json({ error: "Subscription not found" });

      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error updating subscription" });
    }
  }
);

// ------------POST UPDATE AND SEND EMAIL----------------
//tested
app.post(
  "/togglesubscriptions/:id",
  [
    param("id").isMongoId().withMessage("Invalid subscription ID"),
    body("planactive").trim().escape(),
  ],postLimiter,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const subscription = await CustomerPackage.findById(req.params.id);
      if (!subscription) return res.status(404).json({ error: "Subscription not found" });

      subscription.planactive = req.body.planactive;

      if (req.body.planactive === "Active") {
        const now = new Date();
        subscription.activationDate = now;
        let renewalDate = new Date(now);

        if (subscription.plan === "Monthly") renewalDate.setMonth(now.getMonth() + 1);
        else if (subscription.plan === "Quarterly") renewalDate.setMonth(now.getMonth() + 3);
        else if (subscription.plan === "Yearly") renewalDate.setFullYear(now.getFullYear() + 1);
        else renewalDate.setMonth(now.getMonth() + 1);

        subscription.renewalDate = renewalDate;
        await subscriptionActiveEmail(subscription);
      } else if (req.body.planactive === "Cancelled") {
        subscription.renewalDate = null;
        await subscriptionCancelEmail(subscription);
      }

      await subscription.save();
      res.status(200).json({ subscription });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update subscription" });
    }
  }
);


//-------------Contact---------------- (public)
app.post(
  "/contact",
  [
    body("firstName").trim().escape(),
    body("lastName").trim().escape(),
    body("name").trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("message").trim().escape(),
    body("phone").trim().escape(),
  ],postLimiter,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      await sendContactEmail(req.body);
      res.status(200).json({ message: "Message sent successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to send message" });
    }
  }
);

// Socket.io connections
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

//  Start server
const PORT = process.env.PORT ;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
