var express = require('express');
var router = express.Router();
var db = require('../config/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req,res,next) => {
  console.log(req);
  res.send('data');
})

module.exports = router;
