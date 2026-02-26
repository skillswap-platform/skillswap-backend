import User from "../models/User.js";
import UserSkill from "../models/UserSkill.js";


export const getAllMentors = async (req, res) => {
  try {
    // Finding mentors
    const mentors = await User.find({
      role: { $in: ["mentor", "both"] }
    });

    const result = [];

    for (let mentor of mentors) {

      // Find skills they teach
      const skills = await UserSkill.find({
        userId: mentor._id,
        type: "teach"
      }).populate("skillId");

      const skillNames = skills.map(s => s.skillId.name);

      result.push({
        _id: mentor._id,
        name: mentor.name,
        skills: skillNames,
        availability: mentor.availability?.note || "",
        profileId: mentor._id
      });
    }

    res.json(result);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getMentorById = async (req, res) => {
  try {
    const mentor = await User.findById(req.params.id);

    if (!mentor)
      return res.status(404).json({ error: "Mentor not found" });

    const skills = await UserSkill.find({
      userId: mentor._id,
      type: "teach"
    }).populate("skillId");

    const skillNames = skills.map(s => s.skillId.name);

    res.json({
      _id: mentor._id,
      name: mentor.name,
      bio: mentor.bio || "",
      skills: skillNames,
      socialLinks: mentor.socialLinks || {},
      availability: mentor.availability?.note || ""
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};