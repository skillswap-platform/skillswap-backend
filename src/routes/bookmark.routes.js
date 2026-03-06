import express from "express";
import protect from "../middleware/auth.js";
import { createBookmark } from "../controllers/bookmark.controller.js";

const router = express.Router();

router.post("/", protect, createBookmark);

export default router;