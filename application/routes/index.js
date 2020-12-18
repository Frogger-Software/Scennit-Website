var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
var getRecentPosts = require('../middleware/postsmiddleware').getRecentPosts;

/* GET home page. */
router.get('/', getRecentPosts, function (req, res, next) {
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

router.get('/postimage', isLoggedIn, (req, res, next) => {
  res.render("postimage");
})

module.exports = router;
