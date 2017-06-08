var express = require('express');
var router = express.Router();

// GET api page for a poll : necessary to construct the chart
router.get('/', function(req, res, next) {
  if (req.user.username) {
    res.json({'username': req.user.username});
  }
});

module.exports = router;
