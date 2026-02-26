import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";
import Skill from "./models/Skill.js";
import UserSkill from "./models/UserSkill.js";
import Resource from "./models/Resource.js";
import Bookmark from "./models/Bookmark.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("DB connection failed", err);
    process.exit(1);
  }
};

const seed = async () => {
  try {
    console.log("Seeding started...");

    // 🔥 1️⃣ Clear Database
    await Bookmark.deleteMany();
    await Resource.deleteMany();
    await UserSkill.deleteMany();
    await User.deleteMany();
    await Skill.deleteMany();

    console.log("Old data cleared");

    // 🔹 2️⃣ Insert Skills
    const java = await Skill.create({
      name: "Java",
      category: "Programming"
    });

    const node = await Skill.create({
      name: "Node",
      category: "Backend"
    });

    console.log("Skills inserted");

    // 🔹 3️⃣ Insert Users
    const mentor = await User.create({
      name: "Alice",
      email: "alice@test.com",
      role: "mentor",
      availability: {
        isAvailable: true,
        note: "Weekends"
      }
    });

    const learner = await User.create({
      name: "Bob",
      email: "bob@test.com",
      role: "learner",
      availability: {
        isAvailable: true,
        note: "Evenings"
      }
    });

    console.log("Users inserted");

    // 🔹 4️⃣ UserSkill Mapping
    await UserSkill.create({
      userId: mentor._id,
      skillId: java._id,
      type: "teach"
    });

    await UserSkill.create({
      userId: learner._id,
      skillId: node._id,
      type: "learn"
    });

    console.log("UserSkill mappings inserted");

    // 🔹 5️⃣ Insert Resources
    await Resource.create({
      mentorId: mentor._id,
      skillId: java._id,
      type: "youtube",
      title: "Java Basics",
      url: "https://youtube.com/example"
    });

    console.log("Resources inserted");

    console.log("Seed data inserted successfully ✅");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await seed();
};

run();