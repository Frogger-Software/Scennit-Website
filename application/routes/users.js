var express = require('express');
var router = express.Router();
var db = require('../config/database');
const UserModel = require('../models/Users');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const { check, validationResult } = require('express-validator');
const UserError = require("../helpers/error/UserError");
var bcrypt = require('bcrypt');

router.post('/register', [
  check('username').isLength({ min: 3 }),
  check('email').isEmail(),
  check('password').isStrongPassword().withMessage('weak password'),
  check('cpassword').custom(async (cpassword, { req }) => {
    const password = req.body.password

    if (password !== cpassword) {
      throw new Error('Passwords must be the same')
    }
  })
], (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() });
    res.redirect('/registration');
  } else {

    UserModel.usernameExists(username)
      .then((userDoesNameExist) => {
        if (userDoesNameExist) {
          throw new UserError(
            "Registration Failed: Username already exists",
            "/registration",
            200
          );
        } else {
          return UserModel.emailExists(email);
        }
      })
      .then((emailDoesExist) => {
        if (emailDoesExist) {
          throw new UserError(
            "Registration Failed: Email already exists",
            "/registration",
            200
          );
        } else {
          return UserModel.create(username, password, email);
        }
      })
      .then((createdUserId) => {
        if (createdUserId < 0) {
          throw new UserError(
            "Server Error, user could not be created",
            "/registration",
            500
          );
        } else {
          successPrint("User was created");
          req.flash('success', 'user account has been made');
          res.redirect('/login');
        }
      })
      .catch((err) => {
        errorPrint("User not created");
        if (err instanceof UserError) {
          errorPrint(err.getMessage());
          req.flash('error', err.getMessage());
          res.status(err.getStatus());
          res.redirect(err.getRedirectURL());
        } else {
          next(err);
        }
      });
  }
});

router.post('/login', [
  check('username').notEmpty(),
  check('password').notEmpty()
], (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash({ errors: errors.array() });
    res.redirect('/login');
  } else {
    UserModel.authenticate(username, password)
      .then((loggedUserId) => {
        if (loggedUserId > 0) {
          successPrint(`User ${username} is logged in`);
          req.session.username = username;
          req.session.userId = loggedUserId;
          res.locals.logged = true;
          req.flash('success', 'You have successfully logged in');
          res.redirect('/');
        } else {
          throw new UserError("Invalid username and/or password", "/login", 200);
        }
      })
      .catch((err) => {
        errorPrint("user login failed");
        if (err instanceof UserError) {
          errorPrint(err.getMessage());
          req.flash('error', err.getMessage());
          res.status(err.getStatus());
          res.redirect('/login');
        } else {
          next(err);
        }
      })
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint('session could not be destroyed');
      next(err);
    } else {
      successPrint('session destroyed');
      res.clearCookie('csid');
      res.json({ status: "OK", message: "User is logged out" });
    }
  })
});

module.exports = router;
