const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.post("/create", UserController.reg);

router.post("/auth", UserController.auth);

module.exports = router;
