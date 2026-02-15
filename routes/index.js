const router = require("express").Router();
const clothingItemRouter = require("./clothingItems");
const userRouter = require("./users");
const { NOT_FOUND } = require("../utils/errors"); // import error constant

// Mount routers
router.use("/items", clothingItemRouter);
router.use("/users", userRouter);

// Catch-all for unknown routes
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
