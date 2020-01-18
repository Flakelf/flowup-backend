const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.get("/test", UserController.test);

router.post("/reg", UserController.reg);

router.post("/auth", UserController.auth);

module.exports = router;
