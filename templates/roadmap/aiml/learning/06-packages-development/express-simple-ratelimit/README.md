# express-simple-ratelimit

A lightweight rate limiting middleware for Express.js.

## Installation

npm install express-simple-ratelimit

## Usage

const express = require("express");
const rateLimit = require("express-simple-ratelimit");

const app = express();

app.use(rateLimit({
  limit: 100,
  windowMs: 60000
}));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000);
