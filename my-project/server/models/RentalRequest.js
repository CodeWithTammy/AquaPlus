// models/Rental.js
import mongoose from 'mongoose';
import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config();

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); // 32 bytes key

const encrypt = (text) => {
  if (!text) return "";
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

const decrypt = (text) => {
  if (!text || typeof text !== "string" || !text.includes(":")) return "";
  try {
    const [ivHex, encryptedHex] = text.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString("utf8");
  } catch (err) {
    console.error("Decryption error:", err.message);
    return "";
  }
};


const RentalRequestSchema = new mongoose.Schema({
  tool: String,
  price: Number,
  name: { type: String, required: true, set: encrypt, get: decrypt },
  address: { type: String, required: true, set: encrypt, get: decrypt },
  email: { type: String, required: true, set: encrypt, get: decrypt },
  startDate: String,
  phone: { type: String, required: true, set: encrypt, get: decrypt },
  weeks: Number,
  total: Number,
  status: { type: String, default: "Pending" },
  rentStatus: { type: String, enum: ["Pending", "Rented", "Returned"], default: "Pending" },
  returnDate: { type: Date },
  rentedDate: Date

});

RentalRequestSchema.set("toJSON", { getters: true, virtuals: false });
RentalRequestSchema.set("toObject", { getters: true, virtuals: false });
const RentalRequest = mongoose.model("RentalRequest", RentalRequestSchema);

export default RentalRequest;
