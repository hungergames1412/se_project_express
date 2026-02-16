const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");

const {
  DEFAULT_ERROR,
  INVALID_REQUEST,
  NOT_FOUND,
  FORBIDDEN,
  CREATED,
} = require("../utils/errors");

// CREATE
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!name || !weather || !imageUrl) {
    return res.status(INVALID_REQUEST).send({ message: "Invalid data" });
  }

  const owner = req.user._id;

  return ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(CREATED).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(INVALID_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// READ (all)
const getItems = (req, res) =>
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });

// UPDATE
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { name, weather, imageUrl } = req.body;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(INVALID_REQUEST).send({ message: "Invalid data" });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { name, weather, imageUrl },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res.status(INVALID_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// DELETE
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(INVALID_REQUEST).send({ message: "Invalid data" });
  }

  return ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return res
          .status(FORBIDDEN)
          .send({ message: "You do not have permission to delete this item" });
      }

      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.send({ data: item })
      );
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        return res.status(INVALID_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// ADD LIKE
const addLike = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(INVALID_REQUEST).send({ message: "Invalid data" });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        return res.status(INVALID_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// REMOVE LIKE
const removeLike = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(INVALID_REQUEST).send({ message: "Invalid data" });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        return res.status(INVALID_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  addLike,
  removeLike,
};
