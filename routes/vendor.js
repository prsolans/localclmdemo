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

function getRootFolder(auth_token, root_folder_id, callback){
    var uri = 'https://apina11.springcm.com//v201411/folders/' + root_folder_id;
    var xhr = new XMLHttpRequest();
    var clm_response;

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

function getChildDocuments(auth_token, uri, callback){

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

async function getDocument(auth_token, uri, callback){

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

   xhr.send();

}

/* GET home page. */
router.get('/:id', function(req, res, renderPage) {

    var client_id = req.app.locals.client_id;
    var client_secret = req.app.locals.client_secret;
    var auth_URL = req.app.locals.auth_URL;
    var root_folder_id = req.params.id;

    console.log(root_folder_id);

    var auth_token;
    var root_folder_documents_link;

    root_folder_name = '';
    total_agreement_value = 250000;
    agreement_count = 0;
    agreements = '';

    getToken(auth_URL, client_id, client_secret, function() {
        var json = JSON.parse(this.responseText);
        auth_token = json.access_token;

        getRootFolder(auth_token, root_folder_id, function() {
            var json  = JSON.parse(this.responseText);
            root_folder_documents_link = json.Documents.Href;
            root_folder_name = json.Name;

            getChildDocuments(auth_token, root_folder_documents_link, function() {
                var json = JSON.parse(this.responseText);
                agreements = json.Items;
                agreement_count = agreements.length;
                res.render('vendor');
            });
        });
    });
});


module.exports = router;

