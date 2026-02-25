import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/user.routes.js";
import skillRoutes from "./src/routes/skill.routes.js";


const app = express();
app.use(express.json());

app.use("/api/users",userRoutes);
app.use("/api/skills", skillRoutes);

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