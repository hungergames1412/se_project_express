// app.js
const express = require("express");
const mongoose = require("mongoose");

// Import routers
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/clothingItems");

// Import error codes
const { INVALID_REQUEST, NOT_FOUND, SERVER_ERROR } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

// Middleware to parse JSON
app.use(express.json());

// TEMPORARY AUTH: hardcode a test user ID for all requests
app.use((req, res, next) => {
  req.user = {
    _id: "PASTE_YOUR_TEST_USER_ID_HERE", // replace with your test user's _id from MongoDB
  };
  next();
});

// Mount routes
app.use("/users", userRoutes);
app.use("/items", itemRoutes);

// Catch-all for non-existent resources
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err); // always log the error

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(INVALID_REQUEST).send({ message: err.message });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  res
    .status(SERVER_ERROR)
    .send({ message: "An error has occurred on the server." });
});

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
