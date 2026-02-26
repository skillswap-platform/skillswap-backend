import express from "express";
import { assignSkill } from "../controllers/userSkill.controller.js";

const router = express.Router();

router.post("/", assignSkill);

export default router;