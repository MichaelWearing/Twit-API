const express = require("express");
const router = express.Router();

const db = require("../../db/mongodb");

router.put("/", async (req, res) => {
  const rawData = await db();

  try {
   let user = await rawData.findOne({ username: req.query.toBeFollowed });

    let unfollow = req.body.follower.toString().trim().toLowerCase();
    let index;

    user.followers.map((currentFollower) => {
      let cleanCurrentFollower = currentFollower.toString().trim().toLowerCase();

      if (cleanCurrentFollower === unfollow) {
        index = user.followers.indexOf(currentFollower);
        user.followers.splice(index, 1);
      }
    });

    await rawData.updateOne(
      { username: req.query.toBeFollowed },
      {
        $set: {
          username: user.username,
          followers: user.followers,
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
