import UserSkill from "../models/UserSkill.js";
import Skill from "../models/Skill.js";

// POST /api/user-skills
export const assignSkill = async (req, res) => {
  try {
    const { userId, skillId, type } = req.body;

    const userSkill = await UserSkill.create({
      userId,
      skillId,
      type
    });

    res.status(201).json({
      _id: userSkill._id,
      userId: userSkill.userId,
      skillId: userSkill.skillId,
      type: userSkill.type
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// GET /api/users/:id/skills
export const getUserSkills = async (req, res) => {
  try {
    const userSkills = await UserSkill.find({
      userId: req.params.id
    }).populate("skillId");

    const formatted = userSkills.map(us => ({
      skillId: us.skillId._id,
      skillName: us.skillId.name,
      type: us.type
    }));

    res.json(formatted);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};