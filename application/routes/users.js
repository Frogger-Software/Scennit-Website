var express = require('express');
var router = express.Router();
var db = require('../config/database');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const { check, validationResult } = require('express-validator');
const UserError = require("../helpers/error/UserError");
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', [
  check('username').isLength({ min: 3 }),
  check('email').isEmail(),
  check('password').isStrongPassword().withMessage('weak password'),
  check('cpassword').custom(async (cpassword, { req }) => {
    const password = req.body.password

    if (password !== cpassword) {
      throw new Error('Passwords must be same')
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

    db.execute("SELECT * FROM users WHERE username=?", [username])
      .then(([results, fields]) => {
        if (results && results.length == 0) {
          return db.execute("SELECT * FROM users WHERE email=?", [email])

        } else {
          throw new UserError(
            "Registration Failed: Username already exists",
            "/registration",
            200
          );
        }
      }).then(([results, fields]) => {
        if (results && results.length == 0) {
          return bcrypt.hash(password, 13);
        } else {
          throw new UserError(
            "Registration Failed: Email already exists",
            "/registration",
            200
          );
        }
      })
      .then((hashedPassword) => {
        let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?,?,?, now());"
        return db.execute(baseSQL, [username, email, hashedPassword]);
      })
      .then(([results, fields]) => {
        if (results && results.affectedRows) {
          successPrint("User was created");
          res.redirect('/login');
        } else {
          throw new UserError(
            "Server Error, user could not be created",
            "/registration",
            500
          );
        }
      })
      .catch((err) => {
        errorPrint("User not created");
        if (err instanceof UserError) {
          errorPrint(err.getMessage());
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
    console.log({ errors: errors.array() });
    res.redirect('/login');
  } else {
    let baseSQL = "SELECT id, username, password FROM users WHERE username=?;"
    let userId;
    db.execute(baseSQL, [username])
      .then(([results, fields]) => {
        if (results && results.length == 1) {
          let hashedPassword = results[0].password;
          userId = results[0].id;
          return bcrypt.compare(password, hashedPassword);

        } else {
          throw new UserError("invalid username and/or password", "/login", 200);
        }
      })
      .then((passwordsMatched) => {
        if (passwordsMatched) {
          successPrint(`User ${username} is logged in`);
          req.session.username = username;
          req.session.userId = userId;
          res.redirect('/');
        } else {
          throw new UserError("Invalid username and/or password", "/login", 200);
        }
      })
      .catch((err) => {
        errorPrint("user login failed");
        if (err instanceof UserError) {
          errorPrint(err.getMessage());
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
