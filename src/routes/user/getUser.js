const express = require("express");
const router = express.Router();

const db = require("../../db/mongodb");

router.get("/", async (req, res) => {
    const rawData = await db();
  
    let data;
  
    try {
      if (req.query.username) {
        data = await rawData
          .find({ username: req.query.username })
          .toArray();
      } else {
        data = await rawData.find().toArray();
      }

      let nameArray = data.map(name => name.username)

      console.log(nameArray)
  
      if (data.length === 0) {
        res.json("No entries").status(204).end();
      } else {
        res.json(nameArray).status(200).end();
      }
    } catch (e) {
      res.json(`ERROR: ${e}`).status(500).end();
    }
  });

module.exports = router;