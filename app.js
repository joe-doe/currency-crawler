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
var db = monk('localhost:27017/currency');

// make db available to every rout by adding it to req
app.use(function(req,res,next){
    req.db = db;
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
// rule.second = new scheduler.Range(0, 59, 10);
rule.hour = 12;

var job = scheduler.scheduleJob(rule, function() {

  var options = {
    host: 'localhost',
    port: 3000,
    path: '/store'
  };

  http.get(options, function(res){
    console.log('ok');
  });
});

module.exports = app;
