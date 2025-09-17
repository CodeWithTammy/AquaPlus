import mongoose from 'mongoose';
import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config();

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); // 32 bytes key

// Encryption function
const encrypt = (text) => {
  if (!text) return "";
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

// Decryption function
const decrypt = (text) => {
  if (!text) return ""; // handle undefined, null, empty
  const parts = text.split(":");
  if (parts.length !== 2) return ""; // invalid format
  const [ivHex, encryptedHex] = parts;
  try {
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString("utf8");
  } catch (err) {
    console.error("Decryption error:", err);
    return ""; // fail safely
  }
};

// CustomerPackage schema
const CustomerPackageSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "", set: encrypt, get: decrypt },
  email: { type: String, required: true, default: "", set: encrypt, get: decrypt },
  phone: { type: String, required: true, default: "", set: encrypt, get: decrypt },
  address: { type: String, required: true, default: "", set: encrypt, get: decrypt },
  plan: String,
  status: { type: String, default: "Unpaid" },
  planactive: { type: String, default: "Not Active" },
  contactStatus: { type: String, default: "Not Contacted" },
  activationDate: { type: Date },
  renewalDate: { type: Date },
}, { timestamps: true });

// Ensure getters work when converting to JSON
CustomerPackageSchema.set("toJSON", { getters: true, virtuals: false });
CustomerPackageSchema.set("toObject", { getters: true, virtuals: false });

const CustomerPackage = mongoose.model("CustomerPackage", CustomerPackageSchema);

export default CustomerPackage;
