const express = require("express");
const router = express.Router();

const db = require("../../db/mongodb");

router.put("/", async (req, res) => {
    const rawData = await db();
  
    let user;
    let data;
    try {
      user = await rawData
        .find({ username: req.query.tweeter })
        .toArray();
  
      data = await rawData.updateOne(
        { username: req.query.tweeter },
        {
          $set: {
            username:  user[0].username,
            followers: user[0].followers,
            tweets: [...user[0].tweets, req.body.tweet]
            /* tweets: [
              {
                  tweetMessage: "Some nice comments",
                  replies: [
                    "Hey, nice comments",
                    "Thanks"
                  ]
                }
            ] */
          },
        }
      );
    } catch (e) {
      res.json(`ERROR: ${e}`).status(500).end();
    }
  
    res.json(data).status(200).end();
  });

  router.get("/", async (req, res) => {
    const rawData = await db();
  
    let data;
  
    try {
      if (req.query.tweeter) {
        data = await rawData
          .find({ username: req.query.tweeter })
          .toArray();
      } else {
        data = [];
      }
  
      if (data.length === 0) {
        res.json("This user has no tweets").status(204).end();
      } else {
        res.json(data[0].tweets).status(200).end();
      }
    } catch (e) {
      res.json(`ERROR: ${e}`).status(500).end();
    }
  });

module.exports = router;