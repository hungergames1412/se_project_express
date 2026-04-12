const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { errors } = require("celebrate");

const app = express();

const mainRouter = require("./routes/index");

const { errorHandler } = require("./middlewares/errors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(requestLogger);
app.use(cors());

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "WTWR Backend is running" });
});

// Crash test route
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Routes
app.use("/", mainRouter);

// Error handling
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

// Database connection + server start
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
