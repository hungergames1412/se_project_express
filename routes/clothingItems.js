const express = require("express");
const router = express.Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// GET all items
router.get("/", getItems);

// POST create a new item
router.post("/", createItem);

// DELETE an item by ID
router.delete("/:itemId", deleteItem);

// PUT like an item
router.put("/:itemId/likes", likeItem);

// DELETE unlike an item
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
