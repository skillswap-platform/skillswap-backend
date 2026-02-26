import express from "express";
import {
  getAllMentors,
  getMentorById
} from "../controllers/mentor.controller.js";

const router = express.Router();

router.get("/", getAllMentors);
router.get("/:id", getMentorById);

export default router;