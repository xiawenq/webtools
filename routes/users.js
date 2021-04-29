var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/123', function(req, res, next) {
  res.send('respond with a resource 123 ' + req.toString() + ' next = ' + next.toLocaleString());
});

module.exports = router;
