import express from "express";
import {
  createUser,
  getUserById
} from "../controllers/user.controller.js";

import { getUserSkills } from "../controllers/userSkill.controller.js";
import { getUserBookmarks } from "../controllers/bookmark.controller.js";

const router = express.Router();

router.get("/:id/skills", getUserSkills);
router.get("/:id/bookmarks", getUserBookmarks);
router.post("/", createUser);
router.get("/:id", getUserById);


export default router;