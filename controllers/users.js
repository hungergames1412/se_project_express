const User = require("../models/user");
const {
  INVALID_REQUEST,
  NOT_FOUND,
  DEFAULT_ERROR,
} = require("../utils/errors");

// GET /users
module.exports.getUsers = (req, res) => {
  return User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// GET /users/:userId
module.exports.getUser = (req, res) => {
  return User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError")
        return res
          .status(INVALID_REQUEST)
          .send({ message: "Invalid ID format" });
      return res
        .status(err.statusCode || DEFAULT_ERROR)
        .send({
          message: err.message || "An error has occurred on the server.",
        });
    });
};

// POST /users
module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  return User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError")
        return res.status(INVALID_REQUEST).send({ message: err.message });
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};
