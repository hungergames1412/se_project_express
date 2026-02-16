const User = require("../models/user");
const {
  INVALID_REQUEST,
  DEFAULT_ERROR,
  CREATED,
  NOT_FOUND,
} = require("../utils/errors");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(CREATED).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(INVALID_REQUEST).send({ message: "Invalid data" });
      }
      // Generic server error instead of err.message
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(INVALID_REQUEST).send({ message: "Invalid user ID" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
};
