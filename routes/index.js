const express = require('express');
const router = express.Router();
const query = require('../query');

router.post('/matchDetail', async (req, res) => {
  try {
    const { summoner, region } = req.body;
    console.log("Inside /matchDetail..what data: ", summoner, region);
    const response = await query.getMatchDetail(summoner, region);
    res.send(response);
  } catch (err) {
    res.status(404).send(err)
  }
});

module.exports = router;
