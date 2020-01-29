var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    // var rootFolder = req.app.locals.rootFolder;
    // var version = req.app.locals.version;
    // var userType = 'Administrator';

    res.render('index');
    // res.render('index', { userType: userType, secret: req.app.locals.devToken, root: rootFolder, version: version });

});

module.exports = router;
