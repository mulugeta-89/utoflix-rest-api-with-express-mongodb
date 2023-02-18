var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")
const session = require("express-session")
const FileStore = require("session-file-store")(session)
const passport = require('passport')
const authenticate = require("./authenticate")
const dotenv = require("dotenv");

dotenv.config();

var movieRouter = require("./routes/movie")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const uploadRouter = require('./routes/uploadRouter');


//var url = process.env.MONGO_URL;
var url = "mongodb+srv://mulugetahail89:Mulu2835@cluster0.ag2jxwy.mongodb.net/test"
var connect = mongoose.connect(url)
connect.then(() => {
  console.log("database connected successfully!")
})
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/movies", movieRouter)
app.use("/uploadmovies", uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
