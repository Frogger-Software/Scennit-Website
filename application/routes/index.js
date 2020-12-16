var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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

router.post('/submit', (req,res,next) => {
  req.check('username', 'invalid username').isLength({min: 3});
  req.check('username', 'invalid username').isAlphanumeric();
  req.check('email', 'invalid email').isEmail();
  req.check('password', 'invalid password').isStrongPassword().equals(req.body.cpassword);
})


module.exports = router;
