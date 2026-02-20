import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["not_started", "learning", "completed"],
    default: "not_started"
  },
  bestScore: { type: Number }
}, { _id: false });

const UserSkillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true
  },

  type: {
    type: String,
    enum: ["teach", "learn"],
    required: true
  },

  progress: ProgressSchema
});

const UserSkill = mongoose.model("UserSkill", UserSkillSchema);
export default UserSkill;