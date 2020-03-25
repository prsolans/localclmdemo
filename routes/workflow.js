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
    var data = JSON.stringify({ 'client_id': client_id, 'client_secret': client_secret });

    return xhr.send(data);
}

async function triggerWorkflow(auth_token, data, callback) {
    var uri = 'https://apina11.springcm.com/v201411/workflows/';

    // var data = '{"Name": "Local CLM Demo 2", "Params":"One"}';

    console.log(data);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', uri, true);
    xhr.setRequestHeader('Authorization', 'bearer ' + auth_token);
    xhr.setRequestHeader('Content-Type', 'application/json');


    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        // defensive check
        if (typeof callback === "function") {
          // apply() sets the meaning of "this" in the callback
          console.log('1');
          callback.apply(xhr);
        }
      }
    };

    xhr.send(data);

  }


router.post('/', function (req, res) {
    console.log(req.body.title);
    console.log(req.body.description);
    var params = '<root><Name>Local CLM Demo 1</Name><Title>' + req.body.title + '</Title><Description>' + req.body.description + '</Description></root>';

    // var params = '<params><root><Title>999</Title><Description>iii</Description></root></params>';
    var data = '{"Name": "Local CLM Demo 2","Params": "'+params+'"}';

    var client_id = req.app.locals.client_id;
    var client_secret = req.app.locals.client_secret;
    var auth_URL = req.app.locals.auth_URL;
    var auth_token;

    getToken(auth_URL, client_id, client_secret, function () {
        var json = JSON.parse(this.responseText);
        auth_token = json.access_token;
        console.log(auth_token);
        triggerWorkflow(auth_token, data, function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            console.log('5');
        });
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('workflow');

});

module.exports = router;
