var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
var {getRecentPosts, getPostById} = require('../middleware/postsmiddleware');
var db = require('../config/database');

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

router.get('/postimage', isLoggedIn, (req, res, next) => {
  res.render("postimage");
})

router.get('/post/:id(\\d+)', getPostById, (req, res, next) => {
  res.render('imagepost', { title: `Post ${req.params.id}` });
});

router.get('/imagepost', (req, res, next) => {
  res.render("imagepost");
})

module.exports = router;
