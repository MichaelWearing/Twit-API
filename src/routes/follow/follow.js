const express = require("express");
const router = express.Router();

const db = require("../../db/mongodb");

router.put("/", async (req, res) => {
  const rawData = await db();

  try {
   let user = await rawData.findOne({ username: req.query.toBeFollowed });

    let newFollowerList;
    let cleanProposedFollower = req.body.follower.toString().trim().toLowerCase();
    let unfollow = false;
    let index;

    user.followers.map((currentFollower) => {
      let cleanCurrentFollower = currentFollower.toString().trim().toLowerCase();

      if (cleanCurrentFollower === cleanProposedFollower) {
        unfollow = true;
        index = user.followers.indexOf(currentFollower);
        user.followers.splice(index, 1);
      }
    });

    if (unfollow) {
      newFollowerList = user.followers;
    } else {
      newFollowerList = [...user.followers, req.body.follower];
    }

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

router.get("/", async (req, res) => {
  const rawData = await db();

  let data;

  try {
    if (req.query.username) {
      data = await rawData.find({ username: req.query.username }).toArray();
    } else {
      data = [];
    }

    if (data.length === 0) {
      res.json("No followers for that user").status(204).end();
    } else {
      res.json(data[0].followers).status(200).end();
    }
  } catch (e) {
    res.json(`ERROR: ${e}`).status(500).end();
  }
});

module.exports = router;
