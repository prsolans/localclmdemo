var express = require('express');
var SpringCM = require('springcm-node-sdk');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/* GET home page. */
router.get('/', function(req, res, next) {

    var client_id = req.app.locals.client_id;
    var client_secret = req.app.locals.client_secret;
    var auth_URL = req.app.locals.auth_URL;
    var auth_token;

    var root_folder_id = req.app.locals.root_folder_id;
    var root_folder_data;

    var child_folders;


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
        var data = JSON.stringify({ 'client_id': client_id, 'client_secret': client_secret});

        xhr.send(data);
    }

    async function getRootFolder(auth_token, callback){
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

        xhr.send();

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

    async function getChildDocuments(auth_token, uri, callback){

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

    getToken(auth_URL, function () {
        // "this" is the XHR object here!
        var json  = JSON.parse(this.responseText);

        // now do something with resp
        auth_token = json.access_token;

        getRootFolder(auth_token, function () {
            root_folder_data  = JSON.parse(this.responseText);

            var root_folder_name = root_folder_data.Name;
            var root_folder_documents_link = root_folder_data.Documents.Href;
            var root_folder_folders_link = root_folder_data.Folders.Href;

            getChildFolders(auth_token, root_folder_folders_link, function() {
                child_folders = JSON.parse(this.responseText);
                // console.log(child_folders);

                getChildDocuments(auth_token, root_folder_documents_link, function() {
                    child_documents = JSON.parse(this.responseText);
                    var uri1 = child_documents.Items[0].Href + '?expand=AttributeGroups&expand=Path';
                    var uri2 = child_documents.Items[1].Href + '?expand=AttributeGroups&expand=Path';
                    console.log(child_documents.Items);

                    var contract_attributes1 = getDocument(auth_token, uri1, function(data) {
                        this_document = JSON.parse(this.responseText);
                        contract_attributes = this_document.AttributeGroups.Contract;
                        // console.log(this_document);
                        // console.log(this_document.AttributeGroups.Contract);
                        // var data = JSON.stringify({ 'this_document': this_document, 'contract_attributes': contract_attributes});
                        res.render('input', { root_folder_name: root_folder_name, child_folders_total: child_folders.Total, child_documents: child_documents.Items, preview_url: child_documents.Items[0].PreviewUrl, this_document: this_document, contract_attributes: contract_attributes});
                    });

                    // console.log(contract_attributes1);

                    // res.render('input', { root_folder_name: root_folder_name, child_folders_total: child_folders.Total, child_documents_total: child_documents.Total, preview_url: child_documents.Items[0].PreviewUrl, contract_attributes1: contract_attributes1});
                });
            });
        });
    })
});

module.exports = router;
