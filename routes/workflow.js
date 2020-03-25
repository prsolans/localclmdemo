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
          console.log('** triggerWorkflow response **');
          callback.apply(xhr);
        }
      }
    };

    xhr.send(data);
}

async function getRootFolder(auth_token, workflow_folder_id, callback){

    var uri = 'https://apina11.springcm.com//v201411/folders/' + workflow_folder_id;
    var xhr = new XMLHttpRequest();

    xhr.open('GET', uri, true);
    xhr.setRequestHeader('Authorization', 'bearer ' + auth_token);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // defensive check
            if (typeof callback === "function") {
                // apply() sets the meaning of "this" in the callback
                console.log('** getRootFolder response **');
                callback.apply(xhr);
            }
        }
    };

    xhr.send();

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
                console.log('** getChildDocuments response **');
                callback.apply(xhr);
            }
        }
    };

    return xhr.send();

}

async function getLatestDoc(auth_token, filename, callback) {
    var uri = 'https://apina11.springcm.com/v201411/documents/%2FDCD%2FTemplates%2F' + filename;

    console.log(uri);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', uri, true);
    xhr.setRequestHeader('Authorization', 'bearer ' + auth_token);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        // defensive check
        if (typeof callback === "function") {
          // apply() sets the meaning of "this" in the callback
          console.log('** getLatestDoc response **');
          callback.apply(xhr);
        }
      }
    };

    xhr.send();
}

router.post('/', function (req, res) {

    var params = '<root><Title>' + req.body.title + '</Title><Description>' + req.body.description + '</Description></root>';
    var data = '{"Name": "Local CLM Demo 3","Params": "'+params+'"}';
    var filename = encodeURI('LCD3-'+req.body.title+'.docx');

    console.log(filename);

    var client_id = req.app.locals.client_id;
    var client_secret = req.app.locals.client_secret;
    var auth_URL = req.app.locals.auth_URL;
    var workflow_folder_id = req.app.locals.workflow_folder_id;
    var auth_token;

    getToken(auth_URL, client_id, client_secret, function () {
        var json = JSON.parse(this.responseText);
        auth_token = json.access_token;
        console.log(auth_token);
        triggerWorkflow(auth_token, data, function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            getRootFolder(auth_token, workflow_folder_id, function() {
                var json  = JSON.parse(this.responseText);
                root_folder_documents_link = json.Documents.Href;
                getChildDocuments(auth_token, root_folder_documents_link, function() {
                    var json = JSON.parse(this.responseText);
                    agreements = json.Items;
                    last_agreement = agreements[agreements.length - 1];
                    console.log(last_agreement);
                    preview_url = last_agreement['PreviewUrl'];
                    console.log(preview_url);
                    res.render('workflow', {document: preview_url});
                });
            });
            console.log('5');
        });
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('workflow');

});

module.exports = router;
