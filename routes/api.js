var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.user.username) {
    res.json({'username': req.user.username});
  }
});

module.exports = router;
