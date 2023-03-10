const express = require("express");
const router = express.Router();

// import controller
const User = require("../controller/user");

router.post("/signup", User.add);
router.post("/login", User.login);
router.post("/byId", User.byId);
router.post("/allUser", User.getAllUser);
router.post("/update", User.update);
router.post("/remove", User.remove);

module.exports = router;
