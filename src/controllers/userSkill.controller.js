import UserSkill from "../models/UserSkill.js";
import Skill from "../models/Skill.js";

// POST /api/user-skills
export const assignSkill = async (req, res, next) => {
  try {
    const { skillId, type } = req.body;
    const userId = req.user.id;

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
    next(error);
  }
};


// GET /api/users/:id/skills
export const getUserSkills = async (req, res, next) => {
  try {
    const userSkills = await UserSkill.find({
      userId: req.user.id
    }).populate("skillId");

    const formatted = userSkills.map(us => ({
      skillId: us.skillId._id,
      skillName: us.skillId.name,
      type: us.type
    }));

    res.json(formatted);

  } catch (error) {
    next(error);
  }
};