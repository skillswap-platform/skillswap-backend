import express from "express";
import { body } from 'express-validator';
import handleValidationErrors from '../middleware/validation.js';
import protect from '../middleware/auth.js';
import {
  createUser,
  getUserById,
  loginUser,
  updateUser
} from "../controllers/user.controller.js";

import { getUserSkills } from "../controllers/userSkill.controller.js";
import { getUserBookmarks } from "../controllers/bookmark.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/", [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['mentor', 'learner', 'both', 'User']).withMessage('Invalid role')
], handleValidationErrors, createUser);

// protected user actions
router.get("/skills", protect, getUserSkills);
router.get("/bookmarks", protect, getUserBookmarks);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, [
  body('name').optional().isString(),
  body('bio').optional().isString(),
  body('availability').optional().isObject(),
  body('skills').optional().isArray(),
  body('socialLinks').optional().isObject(),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], handleValidationErrors, updateUser);


export default router;