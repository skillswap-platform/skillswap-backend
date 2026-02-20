import mongoose from "mongoose";

const AvailabilitySchema = new mongoose.Schema({
  isAvailable: { type: Boolean, default: false },
  note: { type: String }
}, { _id: false });

const SocialLinksSchema = new mongoose.Schema({
  github: String,
  linkedin: String,
  email: String
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },

  role: {
    type: String,
    enum: ["mentor", "learner", "both"],
    required: true
  },

  bio: { type: String },

  availability: AvailabilitySchema,
  socialLinks: SocialLinksSchema

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;