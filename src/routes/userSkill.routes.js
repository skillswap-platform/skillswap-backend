import express from "express";
import protect from "../middleware/auth.js";
import { assignSkill } from "../controllers/userSkill.controller.js";

const router = express.Router();

router.post("/", protect, assignSkill);

export default router;