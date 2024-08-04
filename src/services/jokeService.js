const Joke = require("../models/joke");

const getJokeFromSubmitService = async () => {
  try {
    const jokes = await Joke.find();
    if (!jokes || jokes.length === 0) {
      throw new Error("No approved jokes found");
    }
    // Return a random joke from the list of approved jokes
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
  } catch (error) {
    console.error("Error in getJokeFromSubmitService:", error);
    throw error;
  }
};

const submitJoke = async (joke) => {
  // Implement the logic to submit the joke
};

const deleteJoke = async (id) => {
  // Implement the logic to delete the joke
};

module.exports = {
  getJokeFromSubmitService,
  submitJoke,
  deleteJoke,
};
