const express = require("express");
const router = express.Router();
const {
  getJoke,
  getAllJokes,
  getJokesByStatus,
  updateJoke,
} = require("../controllers/jokeController");

// Set up routes
router.get("/random", getJoke);
router.get("/", getAllJokes);
router.get("/status/:status", getJokesByStatus);
router.put("/:id", updateJoke);

module.exports = router;
