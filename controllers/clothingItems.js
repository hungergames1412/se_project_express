const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");

const {
  DEFAULT_ERROR,
  INVALID_REQUEST,
  NOT_FOUND,
  FORBIDDEN,
  CREATED,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!name || !weather || !imageUrl) {
    return res
      .status(INVALID_REQUEST) // replaced literal 400
      .send({ message: "name, weather, and imageUrl are required" });
  }

  const owner = req.user._id; // always use req.user._id

  return ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(CREATED).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(INVALID_REQUEST).send({ message: err.message }); // return actual validation error
      }
      if (err.name === "CastError") {
        return res.status(INVALID_REQUEST).send({ message: "Invalid item ID" });
      }
      return res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const getItems = (req, res) => {
  return ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(INVALID_REQUEST).send({ message: "Invalid item ID" });
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
        res.status(200).send({ data: item })
      );
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        return res.status(INVALID_REQUEST).send({ message: "Invalid item ID" });
      }
      return res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const addLike = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(INVALID_REQUEST).send({ message: "Invalid item ID" });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        return res.status(INVALID_REQUEST).send({ message: "Invalid item ID" });
      }
      return res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

const removeLike = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(INVALID_REQUEST).send({ message: "Invalid item ID" }); // fixed message
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        return res.status(INVALID_REQUEST).send({ message: "Invalid item ID" });
      }
      return res.status(DEFAULT_ERROR).send({ message: err.message });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  addLike,
  removeLike,
};
