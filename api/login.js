import mongoose from "mongoose";
import User from "../models/User.js";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB connected ✅");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username or password missing" });
    }

    await User.create({ username, password }); // demo only

    // Instead of res.redirect, send the redirect URL in JSON
    res.status(200).json({ success: true, redirectUrl: "https://sweet-favours.vercel.app" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
