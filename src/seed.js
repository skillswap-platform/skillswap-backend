import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

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
    const skills = await Promise.all([
      // Frontend
      Skill.create({ name: "React", category: "Frontend" }),
      Skill.create({ name: "Vue.js", category: "Frontend" }),
      Skill.create({ name: "Angular", category: "Frontend" }),
      Skill.create({ name: "Tailwind CSS", category: "Frontend" }),
      Skill.create({ name: "Bootstrap", category: "Frontend" }),
      Skill.create({ name: "Svelte", category: "Frontend" }),
      
      // Backend
      Skill.create({ name: "Node.js", category: "Backend" }),
      Skill.create({ name: "Java", category: "Backend" }),
      Skill.create({ name: "Python", category: "Backend" }),
      Skill.create({ name: "Express.js", category: "Backend" }),
      Skill.create({ name: "Django", category: "Backend" }),
      Skill.create({ name: "FastAPI", category: "Backend" }),
      Skill.create({ name: "Spring Boot", category: "Backend" }),
      Skill.create({ name: "ASP.NET", category: "Backend" }),
      Skill.create({ name: "Laravel", category: "Backend" }),
      Skill.create({ name: "Ruby on Rails", category: "Backend" }),
      
      // Databases
      Skill.create({ name: "MongoDB", category: "Database" }),
      Skill.create({ name: "PostgreSQL", category: "Database" }),
      Skill.create({ name: "MySQL", category: "Database" }),
      Skill.create({ name: "Firebase", category: "Database" }),
      Skill.create({ name: "Redis", category: "Database" }),
      
      // Mobile
      Skill.create({ name: "React Native", category: "Mobile" }),
      Skill.create({ name: "Flutter", category: "Mobile" }),
      Skill.create({ name: "Swift", category: "Mobile" }),
      Skill.create({ name: "Kotlin", category: "Mobile" }),
      
      // DevOps & Tools
      Skill.create({ name: "Docker", category: "DevOps" }),
      Skill.create({ name: "Kubernetes", category: "DevOps" }),
      Skill.create({ name: "Git", category: "DevOps" }),
      Skill.create({ name: "CI/CD", category: "DevOps" }),
      Skill.create({ name: "AWS", category: "Cloud" }),
      Skill.create({ name: "Google Cloud", category: "Cloud" }),
      Skill.create({ name: "Azure", category: "Cloud" }),
      
      // Other Languages
      Skill.create({ name: "TypeScript", category: "Programming" }),
      Skill.create({ name: "JavaScript", category: "Programming" }),
      Skill.create({ name: "C++", category: "Programming" }),
      Skill.create({ name: "C#", category: "Programming" }),
      Skill.create({ name: "Go", category: "Programming" }),
      Skill.create({ name: "Rust", category: "Programming" }),
      
      // Other
      Skill.create({ name: "GraphQL", category: "API" }),
      Skill.create({ name: "REST API", category: "API" }),
      Skill.create({ name: "Web Design", category: "Design" }),
      Skill.create({ name: "UI/UX", category: "Design" })
    ]);

    const [react, vue, angular, tailwind, bootstrap, svelte, node, java, python, express, django, fastapi, springboot, aspnet, laravel, rails, mongodb, postgres, mysql, firebase, redis, reactnative, flutter, swift, kotlin, docker, kubernetes, git, cicd, aws, gcp, azure, typescript, javascript, cpp, csharp, go, rust, graphql, rest, webdesign, uiux] = skills;

    console.log(`${skills.length} skills inserted`);

    // 🔹 3️⃣ Insert Users
    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    // 🔹 10 Diverse Users
    const users = await Promise.all([
      // 1. Alice - Mentor, React & Node expert
      User.create({
        name: "Alice Johnson",
        email: "alice@test.com",
        password: hashedPassword,
        role: "mentor",
        bio: "Full-stack developer with 8 years of experience. Passionate about React and Node.js. Always happy to help beginners!",
        skills: ["React", "Node.js", "JavaScript", "Express.js"],
        availability: { isAvailable: true, note: "Weekends" },
        socialLinks: { github: "https://github.com/alice", linkedin: "https://linkedin.com/in/alice" }
      }),

      // 2. Bob - Learner, wants to learn backend
      User.create({
        name: "Bob Smith",
        email: "bob@test.com",
        password: hashedPassword,
        role: "learner",
        bio: "Frontend developer looking to master backend technologies. Currently learning Node.js and databases.",
        skills: ["JavaScript", "React", "HTML/CSS"],
        availability: { isAvailable: true, note: "Evenings after 6 PM" },
        socialLinks: { github: "https://github.com/bob" }
      }),

      // 3. Charlie - Both, Python specialist
      User.create({
        name: "Charlie Brown",
        email: "charlie@test.com",
        password: hashedPassword,
        role: "both",
        bio: "Python enthusiast and data science hobbyist. Teaching Python basics. Always learning new frameworks!",
        skills: ["Python", "Django", "FastAPI", "Data Science"],
        availability: { isAvailable: true, note: "Mornings 9-11 AM" },
        socialLinks: { github: "https://github.com/charlie", linkedin: "https://linkedin.com/in/charlie" }
      }),

      // 4. Diana - Mentor, Mobile developer
      User.create({
        name: "Diana Lee",
        email: "diana@test.com",
        password: hashedPassword,
        role: "mentor",
        bio: "Mobile app developer specializing in Flutter and React Native. Building beautiful cross-platform apps.",
        skills: ["Flutter", "React Native", "Dart", "Kotlin"],
        availability: { isAvailable: false, note: "Available on weekends" },
        socialLinks: { github: "https://github.com/diana", linkedin: "https://linkedin.com/in/diana" }
      }),

      // 5. Eva - Learner, aspiring frontend dev
      User.create({
        name: "Eva Martinez",
        email: "eva@test.com",
        password: hashedPassword,
        role: "learner",
        bio: "Bootcamp graduate looking to master React and modern frontend development.",
        skills: ["JavaScript", "HTML/CSS", "Tailwind CSS"],
        availability: { isAvailable: true, note: "Evenings & weekends" },
        socialLinks: { github: "https://github.com/eva", linkedin: "https://linkedin.com/in/eva" }
      }),

      // 6. Frank - Both, DevOps engineer
      User.create({
        name: "Frank Wilson",
        email: "frank@test.com",
        password: hashedPassword,
        role: "both",
        bio: "DevOps enthusiast. Expert in Docker, Kubernetes, and cloud infrastructure. Love teaching CI/CD pipelines!",
        skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Git"],
        availability: { isAvailable: true, note: "Flexible" },
        socialLinks: { github: "https://github.com/frank", linkedin: "https://linkedin.com/in/frank" }
      }),

      // 7. Grace - Mentor, Designer
      User.create({
        name: "Grace Chen",
        email: "grace@test.com",
        password: hashedPassword,
        role: "mentor",
        bio: "UI/UX designer with 6 years in tech industry. Mentor aspiring designers. Passionate about user-centric design.",
        skills: ["UI/UX", "Web Design", "Figma", "Design Thinking"],
        availability: { isAvailable: true, note: "Tuesday - Thursday" },
        socialLinks: { linkedin: "https://linkedin.com/in/grace", github: "https://github.com/grace" }
      }),

      // 8. Henry - Learner, Java enthusiast
      User.create({
        name: "Henry Patel",
        email: "henry@test.com",
        password: hashedPassword,
        role: "learner",
        bio: "Learning Java and Spring Boot for enterprise development. Interested in backend architecture.",
        skills: ["Java", "SQL", "MySQL"],
        availability: { isAvailable: true, note: "Anytime after work" },
        socialLinks: { github: "https://github.com/henry" }
      }),

      // 9. Iris - Both, ML/AI specialist
      User.create({
        name: "Iris Kim",
        email: "iris@test.com",
        password: hashedPassword,
        role: "both",
        bio: "Data scientist & ML enthusiast. Experienced in Python, TensorFlow, and machine learning. Teaching is my passion!",
        skills: ["Python", "Machine Learning", "Data Science", "TensorFlow", "SQL"],
        availability: { isAvailable: true, note: "Weekends" },
        socialLinks: { github: "https://github.com/iris", linkedin: "https://linkedin.com/in/iris" }
      }),

      // 10. Jack - Mentor, Full-stack master
      User.create({
        name: "Jack Taylor",
        email: "jack@test.com",
        password: hashedPassword,
        role: "mentor",
        bio: "10+ years full-stack experience. Expert in React, Node.js, and MongoDB. Love mentoring junior developers!",
        skills: ["React", "Node.js", "Express.js", "MongoDB", "TypeScript"],
        availability: { isAvailable: true, note: "Evenings" },
        socialLinks: { github: "https://github.com/jack", linkedin: "https://linkedin.com/in/jack" }
      })
    ]);

    console.log(`${users.length} users inserted`);

    // Extract users for easy reference
    const [alice, bob, charlie, diana, eva, frank, grace, henry, iris, jack] = users;

    // 🔹 4️⃣ UserSkill Mapping (sample assignments)
    await Promise.all([
      // Alice teaches React
      UserSkill.create({ userId: alice._id, skillId: react._id, type: "teach" }),
      UserSkill.create({ userId: alice._id, skillId: node._id, type: "teach" }),
      
      // Bob learns Node.js
      UserSkill.create({ userId: bob._id, skillId: node._id, type: "learn" }),
      
      // Charlie teaches and learns Python
      UserSkill.create({ userId: charlie._id, skillId: python._id, type: "teach" }),
      UserSkill.create({ userId: charlie._id, skillId: rust._id, type: "learn" }),
      
      // Diana teaches Flutter
      UserSkill.create({ userId: diana._id, skillId: flutter._id, type: "teach" }),
      
      // Eva learns React
      UserSkill.create({ userId: eva._id, skillId: react._id, type: "learn" }),
      
      // Frank teaches Docker
      UserSkill.create({ userId: frank._id, skillId: docker._id, type: "teach" }),
      UserSkill.create({ userId: frank._id, skillId: kubernetes._id, type: "teach" }),
      
      // Henry learns Java
      UserSkill.create({ userId: henry._id, skillId: java._id, type: "learn" }),
      
      // Iris teaches ML
      UserSkill.create({ userId: iris._id, skillId: python._id, type: "teach" }),
      
      // Jack teaches React + Node
      UserSkill.create({ userId: jack._id, skillId: react._id, type: "teach" }),
      UserSkill.create({ userId: jack._id, skillId: node._id, type: "teach" })
    ]);

    console.log("UserSkill mappings inserted");

    // 🔹 5️⃣ Insert Resources
    await Promise.all([
      Resource.create({
        mentorId: alice._id,
        skillId: react._id,
        type: "youtube",
        title: "React Basics for Beginners",
        url: "https://youtube.com/react-basics"
      }),
      Resource.create({
        mentorId: alice._id,
        skillId: node._id,
        type: "github",
        title: "Node.js Best Practices",
        url: "https://github.com/alice/node-practices"
      }),
      Resource.create({
        mentorId: diana._id,
        skillId: flutter._id,
        type: "youtube",
        title: "Flutter Complete Course",
        url: "https://youtube.com/flutter-course"
      }),
      Resource.create({
        mentorId: frank._id,
        skillId: docker._id,
        type: "doc",
        title: "Docker Documentation and Examples",
        url: "https://docs.docker.com"
      }),
      Resource.create({
        mentorId: jack._id,
        skillId: react._id,
        type: "youtube",
        title: "Advanced React Patterns",
        url: "https://youtube.com/react-advanced"
      }),
      Resource.create({
        mentorId: jack._id,
        skillId: mongodb._id,
        type: "github",
        title: "MERN Stack Project Examples",
        url: "https://github.com/jack/mern-examples"
      })
    ]);

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