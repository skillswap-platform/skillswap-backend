import express from "express";
import { body } from 'express-validator';
import handleValidationErrors from '../middleware/validation.js';
import {
  createUser,
  loginUser
} from "../controllers/user.controller.js";

const router = express.Router();

// Alias routes to match frontend expectations
router.post("/register", [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['mentor', 'learner', 'both', 'User']).withMessage('Invalid role')
], handleValidationErrors, createUser);

router.post("/login", loginUser);

export default router;