import express from "express";
import protect from "../middleware/auth.js";
import {
  createResource,
  getResourcesBySkill
} from "../controllers/resource.controller.js";

const router = express.Router();

router.post("/", protect, createResource);
router.get("/", getResourcesBySkill);

export default router;