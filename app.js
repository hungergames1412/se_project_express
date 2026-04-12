const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { errors } = require("celebrate");

const app = express();

const mainRouter = require("./routes/index");
const { createUser, login } = require("./controllers/users");
const { errorHandler } = require("./middlewares/errors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const {
  userInfoBodyValidation,
  clothingItemBodyValidation,
} = require("./middlewares/validation");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(requestLogger);
app.use(cors());

// Health check route at root
app.get("/", (req, res) => {
  res.status(200).json({ message: "WTWR Backend is running" });
});

// Crash test route
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signup", userInfoBodyValidation, createUser);
app.post("/signin", clothingItemBodyValidation, login);

// Main API routes
app.use("/", mainRouter);

// Error logging & handling
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
