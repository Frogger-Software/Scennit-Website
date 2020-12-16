var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter = require('./routes/dbtest');
var errorPrint = require('./helpers/debug/debugprinters').errorPrint;
var requestPrint = require('./helpers/debug/debugprinters').requestPrint;
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var app = express();

app.engine(
    "hbs",
    handlebars({
        layoutsDir: path.join(__dirname,"views/layouts"),
        partialsDir: path.join(__dirname,"views/partials"),
        extname: ".hbs",
        defaultLayout: "home",
        helpers: {
            /**for helpers */
        }
    })
);

app.set("view engine", "hbs");
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: 'what', saveUninitialized: false, resave: false}));


app.use((req,res,next) => {
    requestPrint(req.url);
    next();
});

app.use('/', indexRouter);
app.use('/dbtest', dbRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.render('error', {err_message: err});
})

module.exports = app;
