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

async function getChildFolders(auth_token, uri, callback){

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

function renderPage(req, res) {
    res.render('vendor', {vendor_name: req.root_folder_name, agreements: req.agreements, total_agreement_value: req.total_agreement_value});

}

/* GET home page. */
router.get('/:id', function(req, res, renderPage) {

    var client_id = req.app.locals.client_id;
    var client_secret = req.app.locals.client_secret;
    var auth_URL = req.app.locals.auth_URL;
    var root_folder_id = req.params.id;

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
                console.log(agreement_count);

                agreements.forEach(element => {
                    var uri = element.Href + '?expand=AttributeGroups&expand=Path';
                    // console.log(uri);
                    getDocument(auth_token, uri, function(data) {
                        // console.log(this.responseText);
                        this_document = JSON.parse(this.responseText);
                        // console.log(this_document);
                        contract_attributes = this_document.AttributeGroups['Contract'];

                        if(contract_attributes != null){
                            // console.log(contract_attributes['Contract Value']['Value']);
                            var this_value = parseInt(contract_attributes['Contract Value']['Value']);
                            console.log(typeof(this_value));
                            total_agreement_value = total_agreement_value + this_value;
                            console.log(total_agreement_value);
                        }
                    });

                });
                renderPage();
                console.log(total_agreement_value);
            });
        });
    });
});


module.exports = router;

