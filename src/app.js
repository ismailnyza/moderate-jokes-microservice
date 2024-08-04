const express = require("express");
const { getJoke, updateJoke } = require("./controllers/jokeController");
const { protect } = require("./middlewares/authMiddleware");
const User = require("./models/user");
const setupSwagger = require("./swagger");
const connectDB = require("./config");
require("dotenv").config(); // Ensure this is included to load environment variables
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Function to create an admin user if it doesn't exist
const createAdminUser = async () => {
  try {
    const userExists = await User.findOne({ email: "admin@admin.com" });

    if (!userExists) {
      const user = new User({
        email: "admin@admin.com",
        password: "admin123",
      });

      await user.save();
      console.log("Admin user created");
    }
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  }
};

// Call the function to create an admin user
createAdminUser();

// Set up Swagger
setupSwagger(app);

// Define routes

// Router setup
const router = express.Router();
app.use("/api/jokes", protect, router);
router.route("/").get(getJoke);
router.route("/:id").put(updateJoke);
app.use("/api/auth", authRoutes);

// Set the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
