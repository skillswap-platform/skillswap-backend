import express from "express";
import {
  createResource,
  getResourcesBySkill
} from "../controllers/resource.controller.js";

const router = express.Router();

router.post("/", createResource);
router.get("/", getResourcesBySkill);

export default router;