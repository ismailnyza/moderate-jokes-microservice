const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       required:
 *         - text
 *         - type
 *       properties:
 *         text:
 *           type: string
 *           description: The joke text
 *         type:
 *           type: string
 *           description: The joke type
 *         status:
 *           type: string
 *           enum: [approved, pending, rejected]
 *           default: pending
 *         rejectionComment:
 *           type: string
 *           description: Comment for rejected jokes
 */
const jokeSchema = new mongoose.Schema({
  text: {
    type: String,
    required: false,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JokeType",
    required: false,
  },
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default: "pending",
  },
  rejectionComment: {
    type: String,
    required: function () {
      return this.status === "rejected";
    },
  },
});

const Joke = mongoose.model("Joke", jokeSchema);

module.exports = Joke;
