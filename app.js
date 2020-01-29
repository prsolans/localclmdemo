var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var inputRouter = require('./routes/input');
var metadataRouter = require('./routes/metadata');
var vendorRouter = require('./routes/vendor');
var allVendorsRouter = require('./routes/all_vendors');

var hydraterRouter = require('./routes/hydrater');

var api_testRouter = require('./routes/api/test');


var app = express();

/////////////////////
// UPDATE HERE

app.locals.client_id = '8c2c1048-25b6-403b-b82b-324910667375';
app.locals.client_secret = '7e4e160011b24c348273547014a0bbff4W7LfCO5jRD2MpJsfB6UP8ReTps6yeTLgqFmbXeOVmnAm0bc4wZnTcH05hjB52ZgT5qykboAcUhkMIOetkd6vWlmzpIWHMk3';
app.locals.auth_URL = 'https://auth.springcm.com/api/v201606/apiuser'
// app.locals.root_folder_id = 'a8c44e6d-0036-ea11-9c2b-d89d6716196d';
app.locals.root_folder_id = '6bb169a7-303e-ea11-9c2b-d89d6716196d'; // Ivy Tech
app.locals.hydrater_doc_id = 'b4d8e1c5-303e-ea11-9c2b-d89d6716196d';

app.locals.GOOGLE_APPLICATION_CREDENTIALS = 'CLM NLP 1-c8a4eb6906d4.json';

/////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/input', inputRouter);
app.use('/vendor', vendorRouter);
app.use('/vendors', allVendorsRouter);
app.use('/metadata', metadataRouter);

app.use('/hydrater', hydraterRouter);

app.use('/api/test', api_testRouter);


app.use(function fileLog(req, res, next) {
    next();
});

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
