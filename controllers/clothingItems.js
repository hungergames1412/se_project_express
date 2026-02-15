const ClothingItem = require("../models/clothingItem");
const { INVALID_REQUEST, NOT_FOUND } = require("../utils/errors");

// GET all items
module.exports.getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      next(err); // pass to centralized error handler
    });
};

// POST create a new clothing item
module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id; // TEMPORARY auth

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);

      // Mongoose validation error
      if (err.name === "ValidationError") {
        return res.status(INVALID_REQUEST).send({ message: err.message });
      }

      next(err); // pass unhandled errors to centralized error handler
    });
};

// DELETE an item by ID
module.exports.deleteItem = (req, res, next) => {
  ClothingItem.findByIdAndRemove(req.params.itemId)
    .orFail(() => {
      const err = new Error("Item not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res
          .status(INVALID_REQUEST)
          .send({ message: "Invalid ID format" });
      }

      next(err);
    });
};

// PUT like an item
module.exports.likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add only if not already present
    { new: true }
  )
    .orFail(() => {
      const err = new Error("Item not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res
          .status(INVALID_REQUEST)
          .send({ message: "Invalid ID format" });
      }

      next(err);
    });
};

// DELETE unlike an item
module.exports.dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove user _id
    { new: true }
  )
    .orFail(() => {
      const err = new Error("Item not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res
          .status(INVALID_REQUEST)
          .send({ message: "Invalid ID format" });
      }

      next(err);
    });
};
