var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

// Vendor Contract View
var vendorRouter = require('./routes/vendor');
var allVendorsRouter = require('./routes/all_vendors');

// Workflow Kickoff View
var workflowRouter = require('./routes/workflow');

// Embedded Doc Launcher
var docLauncherRouter = require('./routes/doc_launcher');

var api_summarizerRouter = require('./routes/api/summarizer');


var app = express();

app.use(cors());

/////////////////////
// UPDATE HERE
app.locals.auth_URL = 'https://auth.springcm.com/api/v201606/apiuser'

app.locals.client_id = '';
app.locals.client_secret = '';
app.locals.root_folder_id = '';
app.locals.workflow_folder_id = '';

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
app.use('/vendor', vendorRouter);
app.use('/vendors', allVendorsRouter);
app.use('/workflow', workflowRouter);
app.use('/doc_launcher', docLauncherRouter);


app.use('/api/summarizer', api_summarizerRouter);


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
