var express = require('express');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


function getToken(auth_URL, client_id, client_secret, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('POST', auth_URL, false);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // defensive check
            if (typeof callback === "function") {
                // apply() sets the meaning of "this" in the callback
                callback.apply(xhr);
            }
        }
    };
    var data = JSON.stringify({ 'client_id': client_id, 'client_secret': client_secret});

    return xhr.send(data);
}

function getUserData(auth_token, callback){
    var uri = 'https://apina11.springcm.com//v201411/users/current';
    var xhr = new XMLHttpRequest();

    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Authorization', 'bearer ' + auth_token);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // defensive check
            if (typeof callback === "function") {
                // apply() sets the meaning of "this" in the callback
                callback.apply(xhr);
            }
        }
    };

    return xhr.send();
}

function getAccountData(auth_token, user_data, callback){
    var uri = 'https://apina11.springcm.com//v201411/accounts/current';
    var xhr = new XMLHttpRequest();

    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Authorization', 'bearer ' + auth_token);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // defensive check
            if (typeof callback === "function") {
                // apply() sets the meaning of "this" in the callback
                callback.apply(xhr);
            }
        }
    };

    return xhr.send();
}

/* GET home page. */
router.get('/', function(req, res, next) {

    var client_id = req.app.locals.client_id;
    var client_secret = req.app.locals.client_secret;
    var auth_URL = req.app.locals.auth_URL;

    var auth_token;

    getToken(auth_URL, client_id, client_secret, function() {
        var json = JSON.parse(this.responseText);
        auth_token = json.access_token;

        getUserData(auth_token, function() {
            var user_data  = JSON.parse(this.responseText);

            getAccountData(auth_token, user_data, function() {
                var account_data  = JSON.parse(this.responseText);
                res.render('index', {user_data: user_data, account_data: account_data});
            })
        });
    });
});

module.exports = router;
