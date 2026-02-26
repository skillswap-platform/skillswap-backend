import express from "express";
import { createBookmark } from "../controllers/bookmark.controller.js";

const router = express.Router();

router.post("/", createBookmark);

export default router;