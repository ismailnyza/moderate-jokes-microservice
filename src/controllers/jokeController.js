const Joke = require("../models/Joke");
const JokeType = require("../models/JokeType");
const {
  submitJoke,
  deleteJoke,
  getJokeFromSubmitService,
} = require("../services/jokeService");

const getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.find().populate("type", "name");
    res.json(jokes);
  } catch (error) {
    console.error("Error fetching jokes:", error);
    res.status(500).json({ message: "Failed to get jokes" });
  }
};

const getJoke = async (req, res) => {
  try {
    const joke = await getJokeFromSubmitService();
    res.json(joke);
  } catch (error) {
    console.error("Error fetching joke:", error);
    res.status(500).json({ message: "Failed to get joke" });
  }
};

const updateJoke = async (req, res) => {
  const { id } = req.params;
  const { text, type, status, rejectionComment } = req.body;

  try {
    const joke = await Joke.findById(id);
    if (!joke) return res.status(404).json({ message: "Joke not found" });

    if (text !== undefined) joke.text = text;
    if (type !== undefined) joke.type = type;
    if (status !== undefined) joke.status = status;
    if (status === "rejected" && rejectionComment !== undefined) {
      joke.rejectionComment = rejectionComment;
    }

    await joke.save();

    if (status === "approved") {
      await submitJoke(joke);
    } else if (status === "rejected") {
      await deleteJoke(joke._id);
    }

    res.json(joke);
  } catch (error) {
    console.error("Error updating joke:", error);
    res.status(500).json({ message: "Failed to update joke" });
  }
};

module.exports = { getAllJokes, getJoke, updateJoke };
