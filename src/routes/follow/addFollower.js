const express = require("express");
const router = express.Router();

const db = require("../../db/mongodb");

router.put("/", async (req, res) => {
  const rawData = await db();

  try {
    let user = await rawData.findOne({ username: req.query.toBeFollowed });
    newFollowerList = [...user.followers, req.body.follower];

    await rawData.updateOne(
      { username: req.query.toBeFollowed },
      {
        $set: {
          username: user.username,
          followers: newFollowerList,
          tweets: user.tweets,
        },
      }
    );
  } catch (e) {
    res.json(`ERROR: ${e}`).status(500).end();
  }

  res.json("Follower list was updated!").status(200).end();
});

module.exports = router;
