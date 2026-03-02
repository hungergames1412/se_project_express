const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getCurrentUser,
  updateUser,
  createUser,
  login,
} = require("../controllers/users");

// Public routes
router.post("/signup", createUser);
router.post("/signin", login);

// Protected routes
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);

module.exports = router;
