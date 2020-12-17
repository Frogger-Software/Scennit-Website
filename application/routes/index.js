var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home');
});

router.get('/login', (req, res, next) => {
  res.render("login");
})

router.get('/registration', (req, res, next) => {
  res.render("registration");
})

router.get('/imagepost', (req, res, next) => {
  res.render("Imagepost");
})

router.get('/postimage', (req, res, next) => {
  res.render("postimage");
})

module.exports = router;
