const JokeType = require("../models/jokeType");

async function createJokeType(name) {
  const jokeType = new JokeType({ name });
  return await jokeType.save();
}

async function getAllJokeTypes() {
  return await JokeType.find();
}

module.exports = {
  createJokeType,
  getAllJokeTypes,
};
