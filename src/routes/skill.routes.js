import express from "express";
import protect from "../middleware/auth.js";
import {
  getAllSkills,
  createSkill
} from "../controllers/skill.controller.js";

const router = express.Router();

router.get("/", getAllSkills);
router.post("/", protect, createSkill);

export default router;