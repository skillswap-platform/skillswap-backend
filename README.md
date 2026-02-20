# SkillSwap Backend

Backend web application for the **SkillSwap** peer-learning platform.  
This service handles user management, database schemas, and API foundations.

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Atlas)**
- **Mongoose**
- **dotenv**

---

## 📂 Project Structure
src/

src/config/

src/config/db.js

src/models/

src/models/User.js

src/controllers/

src/routes/

src/seed.js

index.js

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/skillswap-platform/skillswap-backend.git
cd skillswap-backend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Environment Variables

Create a .env file in the project root.
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

### 4️⃣ Run database seed (optional but recommended)

This inserts initial data and verifies DB connectivity.
```bash
node src/seed.js
```
Expected output:
```bash
Seeding started
MongoDB connection successful
Seed data inserted
```

### 5️⃣ Start the server
To start the server type:
```bash
node index.js
```

Health Check
```bash
GET /health
```
Response:
```bash
{ "status": "ok" }
```
