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
  sendrentalStatusRentedEmail,
  rentalStatusReturnedEmail,
} from "./emailservice/emailservice.js";
import { body, param, validationResult } from "express-validator";
import path from "path";
import { fileURLToPath } from 'url';




// import authRoutes from "./auth.js";
// import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
// import { authMiddleware } from "./authmiddleware.js";
import validator from 'validator';

// Updated validation middleware helper
const sanitizeInput = (value) => {
  return validator.escape(validator.trim(value));
};


const app = express();

// Middleware
app.use(
  cors({
    origin:[ "https://aquacare-plus-pools.onrender.com", 
    "https://aquacarepluspoolsja.com",
    // "https://www.aquacarepluspoolsja.com",
    ],// frontend URL
    credentials: true,
  })
);
// app.use(cookieParser());
app.use(express.json());
app.use(helmet()); // security headers



app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: [
        "'self'",
        "https://res.cloudinary.com",
        "https://form-assets.mailchimp.com",
        "data:"
      ],
      scriptSrc: [
        "'self'",
        "https://apis.google.com",
        "'sha256-Ou9FulhhgRtGHSjC6I2EpgW/TiahZP9zTnbHolOKwr8='",
        "https://chimpstatic.com",
        "https://form-assets.mailchimp.com",
        "https://*.list-manage.com"   // Mailchimp forms and tracking
],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      mediaSrc: ["'self'", "https://res.cloudinary.com"],
     connectSrc: [
        "'self'",
        "https://aquacare-plus-pools.onrender.com",
        "https://aquacarepluspoolsja.com",
        // "https://www.aquacarepluspoolsja.com",
        "https://identitytoolkit.googleapis.com",
        "https://firestore.googleapis.com",
        "https://firebase.googleapis.com",
        "https://chimpstatic.com",
        "https://form-assets.mailchimp.com",
        "https://*.list-manage.com",
        "https://eventcollector.mcf-prod.a.intuit.com",
        "https://*.execute-api.us-east-2.amazonaws.com",
        "https://securetoken.googleapis.com",
        "https://mcf-integrations-mcmktg.mlchmpcompprduse2.iks2.a.intuit.com"

],
      objectSrc: ["'none'"],
      frameSrc: ["'self'", "https://aquacareplus-4112b.firebaseapp.com"],
    },
  })
);


// Convert ES module URL to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React build for all other routes
app.use(express.static(path.join(__dirname, "../dist")));


app.set('trust proxy', 1); // 1 means trust first proxy

// Rate limiter specifically for POST routes
const postLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 requests per IP per 15 minutes
  message: { error: "Too many requests, please try again later." },
});


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
    origin: ["https://aquacare-plus-pools.onrender.com",
    "https://aquacarepluspoolsja.com",
    // "https://www.aquacarepluspoolsja.com"
    ],
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


// --------ROUTES-----------
// -------GET SERVICES----------
//tested
app.get("/api", async (req, res) => {
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
  "/api/services/:title",
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
app.get("/api/rentals", async (req, res) => {
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
  "/api/rentals",
  upload.single("image"),
  [
    body("name").trim().notEmpty().escape().withMessage("Name is required"),
    body("price").trim().notEmpty().matches(/^\d+JMD\/week$/).withMessage("Price must be in the format '50JMD/week'"),
    body("desc").trim().escape().withMessage("Description must be valid"), // ✅ Added
    body("amount")
      .isInt({ min: 0 })
      .withMessage("Amount must be a positive integer"),
  ],
  postLimiter, 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newRental = new Rental({
        name: req.body.name,
        price: req.body.price,
        desc: req.body.desc,
        amount: req.body.amount,
        image: req.file ? req.file.path : "",
      });

      await newRental.save();
      res.status(201).json({ message: "Rental added safely", rental: newRental });
    } catch (err) {
      console.error("Error adding rental:", err);
      res.status(500).json({ error: "Failed to add rental" });
    }
  }
);

//----------DELETE RENTAL--------------
//Tested
app.delete(
  "/api/rentals/:id",
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
app.get("/api/rentalrequest", async (req, res) => {
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
  "/api/rentalrequest/:id",
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
  "/api/rentalrequest",
  [
    body("tool").trim().escape(),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("name").trim().escape().notEmpty().withMessage("Name is required"),
    body("address").trim().escape().notEmpty().withMessage("Address is required"),
    body("email").isEmail().normalizeEmail(),
    body("startDate").isISO8601().withMessage("Invalid start date"),
    body("phone")
      .trim()
      .matches(/^[\d\s\-\+\(\)]+$/) // ✅ Only allow valid phone characters
      .withMessage("Invalid phone number format"),
    body("weeks").isInt({ min: 1 }).withMessage("Weeks must be at least 1"),
    body("total").isFloat({ min: 0 }).withMessage("Total must be a positive number"),
  ], 
  postLimiter,
  async (req, res) => {
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


//-------------SEND UPDATE ON RENTAL REQUEST--------------
// tested

app.patch(
  "/api/rentalrequest/:id",
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
  "/api/rentalrequest/:id",
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

//------------Toggle RENT STATUS-----------
app.post(
  "/api/toggleRent/:id",
  [
    param("id").isMongoId().withMessage("Invalid rental request ID"),
    body("rentStatus").trim().escape(),
  ],postLimiter,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const rentalStatus = await RentalRequest.findById(req.params.id);
      if (!rentalStatus) return res.status(404).json({ error: "Rental Request not found" });

      rentalStatus.rentStatus = req.body.rentStatus;

      if (req.body.rentStatus === "Rented") {
          // Use the startDate the user selected
      const rentedDate = new Date(rentalStatus.startDate);
      rentalStatus.rentedDate = rentedDate;

        // Calculate return date from weeks
      const weeks = rentalStatus.weeks || 1;
      const returnDate = new Date(rentedDate);
      returnDate.setDate(returnDate.getDate() + weeks * 7);

      rentalStatus.returnDate = returnDate;
      rentalStatus.rentStatus = "Rented";
        
  await sendrentalStatusRentedEmail(rentalStatus);

}else if (req.body.rentStatus === "Returned") {
         rentalStatus.rentStatus = "Returned";
        rentalStatus.returnDate = new Date(); // actual returned date
        await rentalStatusReturnedEmail(rentalStatus);
      }else{
          rentalStatus.rentStatus = "Pending";
      }

      await rentalStatus.save();
      res.status(200).json({ rentalStatus });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update rental status" });
    }
  }
);



// ---------------POST USER SERVICE REQUEST---------------
// tested
app.post(
  "/api/requestservices",
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
      .matches(/^[\d\s\-\+\(\)]+$/) // ✅ Phone validation
      .withMessage("Invalid phone number format"),
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
      .matches(/^(0?[1-9]|1[0-2]):([0-5]\d) ?([AP]M)$/i)
      .withMessage("Time must be in HH:MM AM/PM format"),
    body("message")
      .trim()
      .escape()
      .isLength({ max: 1000 }) // ✅ Added length limit
      .withMessage("Message too long"),
  ],
  postLimiter,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
      return res.status(400).json({ errors: errors.array() });

    try {
      const request = new RequestService(req.body);
      await request.save();
      io.emit("requestUpdated", request);

      await sendServiceRequestEmail(request).catch(() => 
        console.error("Business email failed")
      );
      await sendServiceRequestConfirmation(request).catch(() => 
        console.error("Confirmation email failed")
      );

      res.status(201).json({ message: "Request submitted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error saving request" });
    }
  }
);
// ---------GET SERVICE REQUESTS---------------
//tested
app.get("/api/requestservices", async (req, res) => {
  try {
    const requests = await RequestService.find();
    res.json(requests.map(r => r.toJSON()));
  } catch (err) {
    console.error("Fetch error:" , err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------GET SERVICE REQUEST BY ID-------------------
//tested
app.get(
  "/api/requestservices/:id",
  [param("id").isMongoId().withMessage("Invalid request ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const request = await RequestService.findById(req.params.id);
      if (!request) return res.status(404).json({ error: "Request not found" });
      res.json(request.toJSON()); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error fetching request" });
    }
  }
);
// ----------------SEND UPDATE TO REQUEST SERVICES----------------
//tested
app.patch(
  "/api/requestservices/:id",
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

// --------------------DELETE SERVICE REQUEST---------------------
app.delete(
  "/api/requestservices/:id",
  [param("id").isMongoId().withMessage("Invalid service request ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const servicerequest = await RequestService.findByIdAndDelete(req.params.id);
      if (!servicerequest) return res.status(404).json({ error: "Service request not found" });
      res.json({ message: "Service request deleted successfully", id: req.params.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete service request" });
    }
  }
);


//-------------------Subscriptions---------------------
// ----------------GET USER SUBSCRIPTIONS----------------
//tested
app.get("/api/subscriptions", async (req, res) => {
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
  "/api/subscriptions/:id",
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
  "/api/subscriptions",
  [
    body("name").trim().notEmpty().escape().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("phone")
      .trim()
      .matches(/^[\d\s\-\+\(\)]+$/) // ✅ Phone validation
      .withMessage("Invalid phone number format"),
    body("address").trim().notEmpty().escape().withMessage("Address is required"),
    body("plan").trim().notEmpty().escape().withMessage("Plan is required"),
    body("status").optional().trim().escape(),
    body("planactive").optional().trim().escape(),
    body("contactStatus").optional().trim().escape(),
    body("activationDate").optional().isISO8601().withMessage("Invalid date"),
    body("renewalDate").optional().isISO8601().withMessage("Invalid date"),
  ],
  postLimiter,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
      return res.status(400).json({ errors: errors.array() });

    try {
      const data = { ...req.body };

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
app.delete(
  "/api/subscriptions/:id",
  [param("id").isMongoId().withMessage("Invalid subscription ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const rentalrequest = await CustomerPackage.findByIdAndDelete(req.params.id);
      if (!rentalrequest) return res.status(404).json({ error: "Subscription not found" });
      res.json({ message: "Subscription deleted successfully", id: req.params.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete subscription" });
    }
  }
);

// -----------------SEND UPDATE FOR USER---------------
//tested
// -----------------SEND UPDATE FOR USER---------------
app.patch(
  "/api/subscriptions/:id",
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
  "/api/togglesubscriptions/:id",
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
  "/api/contact",
  [
    body("firstName").trim().escape().notEmpty().withMessage("First name required"),
    body("lastName").trim().escape().notEmpty().withMessage("Last name required"),
    body("name").trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("message")
      .trim()
      .escape()
      .isLength({ min: 10, max: 1000 }) // ✅ Added length limits
      .withMessage("Message must be between 10-1000 characters"),
    body("phone")
      .trim()
      .matches(/^[\d\s\-\+\(\)]+$/) // ✅ Phone validation
      .withMessage("Invalid phone number"),
  ],
  postLimiter,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
      return res.status(400).json({ errors: errors.array() });

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


app.get("*", (req, res) => {
  // For SPA routing, serve index.html
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

//  Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
