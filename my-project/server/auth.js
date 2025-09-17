// // auth.js
// import express from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import rateLimit from "express-rate-limit";
// import helmet from "helmet";
// import xss from "xss-clean";
// import validator from "validator";

// dotenv.config();
// const router = express.Router();

// const JWT_SECRET = process.env.JWT_SECRET;
// if (!JWT_SECRET) {
//   console.error("JWT_SECRET missing in .env");
//   process.exit(1);
// }

// // Apply extra security middlewares
// router.use(helmet());
// router.use(xss());

// // Rate limit login attempts (5 per 15 minutes)
// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5,
//   message: "Too many login attempts. Try again later.",
// });

// // Admin Login
// router.post("/adminsignin", loginLimiter, (req, res) => {
//   let { username, password } = req.body;

//   // Basic input sanitization
//   if (!username || !password) {
//     return res.status(400).json({ error: "Username and password required" });
//   }

//   username = validator.escape(username.trim());
//   password = password.trim();

//   // Check credentials from .env
//   if (
//     username === process.env.ADMIN_USERNAME &&
//     password === process.env.ADMIN_PASSWORD
//   ) {
//     const token = jwt.sign(
//       { username },
//       JWT_SECRET,
//       {
//         expiresIn: "15m",
//         algorithm: "HS256", // enforce secure algo
//       }
//     );

//     // HttpOnly secure cookie
//     res.cookie("adminToken", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 15 * 60 * 1000, // 15 minutes
//     });

//     return res.json({ message: "Login successful" });
//   }

//   return res.status(401).json({ error: "Invalid username or password" });
// });

// // Logout
// router.post("/logout", (req, res) => {
//   res.clearCookie("adminToken", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   });
//   res.json({ message: "Logged out" });
// });

// export default router;







// // import express from "express";
// // import jwt from "jsonwebtoken";
// // import dotenv from "dotenv";

// // dotenv.config();
// // const router = express.Router();

// // // POST /adminsignin → login using .env credentials
// // router.post("/adminsignin", (req, res) => {
// //   const { username, password } = req.body;

// //   if (!username || !password) {
// //     return res.status(400).json({ error: "Username and password required" });
// //   }

// //   // Compare with env credentials
// //   if (
// //     username === process.env.ADMIN_USERNAME &&
// //     password === process.env.ADMIN_PASSWORD
// //   ) {
// //     if (!process.env.JWT_SECRET) {
// //       return res.status(500).json({ error: "JWT_SECRET missing in .env" });
// //     }

// //     const token = jwt.sign(
// //       { username },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "15m" }
// //     );

   

// //     return res.json({ token });
// //   } else {
// //     return res.status(401).json({ error: "Invalid username or password" });
// //   }
// // });

// // // Protected route example
// // router.get("/admins", (req, res) => {
// //   const authHeader = req.headers.authorization;
// //   const token = authHeader && authHeader.split(" ")[1];

// //   if (!token) return res.status(401).json({ error: "No token provided" });

// //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// //     if (err) return res.status(403).json({ error: "Invalid or expired token" });

// //     res.json({ message: "Welcome Admin!", user: decoded });
// //   });
// // });



// // export default router;
