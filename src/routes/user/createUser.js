const express = require("express");
const router = express.Router();

const db = require("../../db/mongodb");

router.post("/", async (req, res) => {
  const rawData = await db();

  let userExists = await rawData.findOne({
    username: req.body.username,
  });

  if (userExists) {
    res.json("Username is already taken").status(409).end();
  } else {
    createUser(req, res, rawData);
  }
});

const createUser = async (req, res, rawData) => {
  let data;
  const user = {
    username: req.body.username,
    followers: [],
    tweets: [],
  };

  try {
    data = await rawData.insertOne(user);
  } catch (error) {
    res.json(`Error: ${error}`).status(500).end();
  }

  res.json(req.body).status(200).end();
};

module.exports = router;
