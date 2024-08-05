const mongoose = require("mongoose");

const jokeTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const JokeType = mongoose.model("JokeType", jokeTypeSchema);

module.exports = JokeType;
