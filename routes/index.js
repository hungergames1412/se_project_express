const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");

// Public auth routes
router.post("/signup", createUser);
router.post("/signin", login);

// Mount routers
router.use("/items", clothingItemRouter);
router.use("/users", userRouter);

// 404 handler
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router resource not found" });
});

module.exports = router;
