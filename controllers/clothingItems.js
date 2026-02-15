const ClothingItem = require("../models/clothingItem");
const {
  INVALID_REQUEST,
  NOT_FOUND,
  DEFAULT_ERROR,
} = require("../utils/errors");

// GET /items
module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// POST /items
module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(INVALID_REQUEST).send({ message: err.message });
      }
      res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// DELETE /items/:itemId
module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndRemove(itemId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError")
        return res
          .status(INVALID_REQUEST)
          .send({ message: "Invalid ID format" });
      res
        .status(err.statusCode || DEFAULT_ERROR)
        .send({
          message: err.message || "An error has occurred on the server.",
        });
    });
};

// PUT /items/:itemId/likes
module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id if not exists
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      res
        .status(err.statusCode || DEFAULT_ERROR)
        .send({
          message: err.message || "An error has occurred on the server.",
        });
    });
};

// DELETE /items/:itemId/likes
module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      res
        .status(err.statusCode || DEFAULT_ERROR)
        .send({
          message: err.message || "An error has occurred on the server.",
        });
    });
};
