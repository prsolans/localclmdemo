var express = require('express');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/* GET home page. */
router.get('/', function (req, res, next) {

  var client_id = req.app.locals.client_id;
  var client_secret = req.app.locals.client_secret;
  var auth_URL = req.app.locals.auth_URL;
  var auth_token;

  var root_folder_id = req.app.locals.root_folder_id;
  var hydrater_doc_id = req.app.locals.hydrater_doc_id;
  // var child_folders;

  async function getToken(auth_URL, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', auth_URL, true);
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

    xhr.send(data);
  }

  getToken(auth_URL, function () {
    var json = JSON.parse(this.responseText);
    console.log('1');
    auth_token = json.access_token;

    console.log(auth_token);

  });
});

module.exports = router;
