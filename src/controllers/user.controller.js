import User from "../models/User.js";

// 🔹 POST /api/users
export const createUser = async (req, res) => {
  try {
    const { name, email, role, availability } = req.body;

    const user = await User.create({
      name,
      email,
      role,
      availability
    });

    console.log("Created user:", user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      availability: user.availability,
      createdAt: user.createdAt
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// 🔹 GET /api/users/:id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ error: "User not found" });

    // return EXACT shape from contract
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      availability: user.availability
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};