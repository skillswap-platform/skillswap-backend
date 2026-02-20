import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./src/config/db.js";

const app = express();
app.use(express.json());

// test route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend running" });
});

// connect DB first
await connectDB();

// start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});