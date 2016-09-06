var config = require('config');
var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var scheduler = require('node-schedule');

var index = require('./routes/index');
var users = require('./routes/users');
var store = require('./routes/store');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mongo = require('mongodb');
var monk = require('monk');
var db_path = process.env.MONGO_URI || 'localhost:27017/currency';
var db = monk(db_path);

// make db and config available to every route by adding them to req
app.use(function(req,res,next){
    req.db = db;
    req.config = config;
    next();
});

// here come the routes
app.use('/', index);
app.use('/users', users);
app.use('/store', store);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// start scheduler
var rule = new scheduler.RecurrenceRule();
// rule.hour = new scheduler.Range(0, 23, 1);
rule.minute = 40;

var job = scheduler.scheduleJob(rule, function() {

  var options = {
    host: config.get('host'),
    port: config.get('port'),
    path: config.get('path')
  };

  http.get(options, function(res){
    console.log('ok');
  });
});

console.log(config.get('host'));
module.exports = app;
