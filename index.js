import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/user.routes.js";
import skillRoutes from "./src/routes/skill.routes.js";
import userSkillRoutes from "./src/routes/userSkill.routes.js";
import mentorRoutes from "./src/routes/mentor.routes.js";
import resourceRoutes from "./src/routes/resource.routes.js";
import bookmarkRoutes from "./src/routes/bookmark.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import errorHandler from "./src/middleware/errorHandler.js";

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());

app.use("/api/users",userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/user-skills", userSkillRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/auth", authRoutes); // Add auth routes

// test route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend running" });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// connect DB first
await connectDB();

// start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});