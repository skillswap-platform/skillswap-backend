import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 🔹 POST /api/users
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role, availability, skills } = req.body;

    // Map 'User' to 'learner'
    const mappedRole = role === 'User' ? 'learner' : role;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: mappedRole,
      availability,
      skills
    });

    console.log("Created user:", user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      skills: user.skills,
      availability: user.availability,
      createdAt: user.createdAt
    });

  } catch (error) {
    next(error);
  }
};


// 🔹 GET /api/users/:id
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user)
      return res.status(404).json({ error: "User not found" });

    // return EXACT shape from contract
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      availability: user.availability,
      skills: user.skills,
      bio: user.bio,
      socialLinks: user.socialLinks
    });

  } catch (error) {
    next(error);
  }
};

// 🔹 POST /api/users/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }

  } catch (error) {
    next(error);
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// 🔹 PUT /api/users/:id
export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ error: 'Not authorized to edit this user' });
    }

    const {
      name,
      bio,
      availability,
      skills,
      socialLinks,
      password
    } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (bio !== undefined) updates.bio = bio;
    if (availability !== undefined) updates.availability = availability;
    if (skills !== undefined) updates.skills = skills;
    if (socialLinks !== undefined) updates.socialLinks = socialLinks;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
      context: 'query'
    }).select('-password');

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      availability: user.availability,
      skills: user.skills,
      bio: user.bio,
      socialLinks: user.socialLinks
    });

  } catch (error) {
    next(error);
  }
};