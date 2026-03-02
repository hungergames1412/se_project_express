const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");

// Mount routers
router.use("/items", clothingItemRouter); // /items GET public, other routes protected
router.use("/users", userRouter); // /users/signup, /users/signin public, /users/me protected

// 404 handler
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router resource not found" });
});

module.exports = router;
