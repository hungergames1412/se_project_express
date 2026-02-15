const express = require("express");
const mongoose = require("mongoose");

// Import routers
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/clothingItems");

// Import error codes
const { INVALID_REQUEST, NOT_FOUND, DEFAULT_ERROR } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

// Middleware to parse JSON
app.use(express.json());

// TEMPORARY AUTH: hardcode a test user
app.use((req, res, next) => {
  req.user = {
    _id: "69912de9d2234eea89bffcf1",
  };
  next();
});

// Mount routes
app.use("/users", userRoutes);
app.use("/items", itemRoutes);

// Catch-all for non-existent routes
app.use((req, res, next) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err); // Always log errors for debugging

  // Validation errors or invalid IDs
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(INVALID_REQUEST).send({ message: err.message });
  }

  // Custom errors with statusCode
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  // Default server error
  return res
    .status(DEFAULT_ERROR)
    .send({ message: "An error has occurred on the server." });
});

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Start the server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
