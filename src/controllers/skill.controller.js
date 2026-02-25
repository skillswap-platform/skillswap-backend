import Skill from "../models/Skill.js";

// 🔹 GET /api/skills
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();

    // Return only contract fields
    const formatted = skills.map(skill => ({
      _id: skill._id,
      name: skill.name,
      category: skill.category
    }));

    res.json(formatted);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// 🔹 POST /api/skills
export const createSkill = async (req, res) => {
  try {
    const { name, category } = req.body;

    const existing = await Skill.findOne({ name });

    if (existing) {
      return res.status(400).json({
        error: "Skill already exists"
      });
    }

    const skill = await Skill.create({ name, category });

    res.status(201).json({
      _id: skill._id,
      name: skill.name,
      category: skill.category
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};