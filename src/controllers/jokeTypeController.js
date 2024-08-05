const jokeTypeService = require("../services/jokeTypeService");

const createJokeType = async (req, res) => {
  try {
    const { name } = req.body;
    const jokeType = await jokeTypeService.createJokeType(name);
    res.status(201).json(jokeType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllJokeTypes = async (req, res) => {
  try {
    const jokeTypes = await jokeTypeService.getAllJokeTypes();
    res.status(200).json(jokeTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createJokeType,
  getAllJokeTypes,
};
