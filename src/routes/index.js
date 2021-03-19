const express = require("express");
const router = express.Router();

const getUser = require("./user/getUser");
const createUser = require("./user/createUser");
const follow = require("./follow/follow");
const unfollow = require("./follow/unfollow");
const addFollower = require("./follow/addFollower");
const tweet = require("./tweet/tweet");

router.use("/", getUser);
router.use("/createUser", createUser);
router.use("/follow", follow);
router.use("/unfollow", unfollow);
router.use("/addFollower", addFollower);
router.use("/tweet", tweet);


module.exports = router;