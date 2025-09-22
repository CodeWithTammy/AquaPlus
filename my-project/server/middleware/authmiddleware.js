
// // authmiddleware.js
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;
// // console.log("JWT_SECRET loaded in authmiddleware:", JWT_SECRET);

// if (!JWT_SECRET) {
//   console.error("JWT_SECRET is not defined in environment variables.");
//   process.exit(1); // Exit if JWT_SECRET is not set
// }

// export const authMiddleware = (req, res, next) => {
//  try {
//     // Support both headers and cookies
//     const authHeader = req.headers["authorization"];
//     const token =
//       (authHeader && authHeader.split(" ")[1]) || req.cookies?.adminToken;

//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     // Verify with explicit algorithm
//     const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });

//     // Attach decoded user to request
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error("JWT verification failed:", err.message);

//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Token expired" });
//     }
//     if (err.name === "JsonWebTokenError") {
//       return res.status(403).json({ message: "Invalid token" });
//     }

//     return res.status(403).json({ message: "Authentication failed" });
//   }
// };
