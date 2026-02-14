const express = require("express");

const app = express();

// test route
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend running" });
});

// start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
