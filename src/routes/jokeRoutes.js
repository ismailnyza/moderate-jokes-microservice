const express = require("express");
const { getJoke, updateJoke } = require("../controllers/jokeController");
const {
  getJoke,
  getAllJokes,
  getJokesByStatus,
  updateJoke,
} = require("../controllers/jokeController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/jokes:
 *   get:
 *     summary: Get a random joke
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: A random joke
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                 type:
 *                   type: string
 *                 status:
 *                   type: string
 *                 rejectionComment:
 *                   type: string
 *       500:
 *         description: Failed to get joke
 */
router.route("/").get(protect, getAllJokes);

/**
 * @swagger
 * /api/jokes/{id}:
 *   put:
 *     summary: Update a joke
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The joke ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               type:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [approved, pending, rejected]
 *               rejectionComment:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated joke
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                 type:
 *                   type: string
 *                 status:
 *                   type: string
 *                 rejectionComment:
 *                   type: string
 *       404:
 *         description: Joke not found
 *       500:
 *         description: Failed to update joke
 */
router.route("/:id").put(protect, updateJoke);

module.exports = router;
