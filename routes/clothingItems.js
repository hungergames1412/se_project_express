const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItem,
  addLike,
  removeLike,
} = require("../controllers/clothingItems");

// Public route
router.get("/", getItems);

// Protected routes
router.post("/", auth, createItem);
router.delete("/:itemId", auth, deleteItem);
router.put("/:itemId/likes", auth, addLike);
router.delete("/:itemId/likes", auth, removeLike);

module.exports = router;
