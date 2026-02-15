// routes/users.js
const express = require("express");
const router = express.Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

// GET all users
router.get("/", getUsers);

// GET a user by ID
router.get("/:userId", getUser);

// POST create a new user
router.post("/", createUser);

module.exports = router;
