const express = require("express");
const router = express.Router();
const {
  createJokeType,
  getAllJokeTypes,
} = require("../controllers/jokeTypeController");

// Set up routes
router.post("/joke-types", createJokeType);
router.get("/joke-types", getAllJokeTypes);

module.exports = router;
