var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var env = require('dotenv').config()
global.mongoose = require('mongoose');
global.config = require('./config/config');

var indexrouter = require('./router/index')

// create express app
const app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// parse application/json
app.use(bodyParser.json())

app.use("/", indexrouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.listen(process.env.PORT, () => { console.log('Server listening on ' + process.env.PORT) });


module.exports = app;