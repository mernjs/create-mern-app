const express = require("express");
const rateLimit = require("./index");

const app = express();

app.use(rateLimit({ limit: 3, windowMs: 10000 }));

app.get("/", (req, res) => {
  res.json({ message: "Request allowed" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
