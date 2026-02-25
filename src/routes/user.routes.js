import express from "express";
import {
  createUser,
  getUserById
} from "../controllers/user.controller.js";

// import { getUserSkills } from "../controllers/userSkill.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUserById);
// router.get("/:id/skills", getUserSkills);  // from contract

export default router;