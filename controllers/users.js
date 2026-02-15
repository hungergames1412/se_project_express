const User = require("../models/user"); // your Mongoose user model
const { BAD_REQUEST, NOT_FOUND } = require("../utils/errors");

// GET all users
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// GET a user by ID
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error("User not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((user) => res.send(user))
    .catch(next);
};

// POST create a new user
module.exports.createUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch(next);
};
