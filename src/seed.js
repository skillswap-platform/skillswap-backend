import dotenv from "dotenv";
import connectDB from "./config/db.js";

import User from "./models/User.js";
import Skill from "./models/Skill.js";
import UserSkill from "./models/UserSkill.js";
import Resource from "./models/Resource.js";

dotenv.config();

(async () => {
  try {
    console.log("Seeding started");

    await connectDB();
    console.log("DB connected");

    await User.deleteMany();
    await Skill.deleteMany();
    await UserSkill.deleteMany();
    await Resource.deleteMany();

    const users = await User.insertMany([
      { name: "Alice", email: "alice@test.com", role: "mentor" },
      { name: "Bob", email: "bob@test.com", role: "learner" }
    ]);

    const skills = await Skill.insertMany([
      { name: "Java" },
      { name: "React" }
    ]);

    await UserSkill.create({
      userId: users[0]._id,
      skillId: skills[0]._id,
      type: "teach"
    });

    await Resource.create({
      mentorId: users[0]._id,
      skillId: skills[0]._id,
      type: "youtube",
      title: "Java Basics",
      url: "https://youtube.com/..."
    });

    console.log("Seed data inserted");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
})();