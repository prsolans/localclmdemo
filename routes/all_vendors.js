var express = require('express');
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


    getToken(auth_URL, function () {
        // "this" is the XHR object here!
        var json  = JSON.parse(this.responseText);

        // now do something with resp
        auth_token = json.access_token;

        getRootFolder(auth_token, function () {
            root_folder_data  = JSON.parse(this.responseText);

            var root_folder_folders_link = root_folder_data.Folders.Href;

            getChildFolders(auth_token, root_folder_folders_link, function() {
                child_folders = JSON.parse(this.responseText);
                // console.log(child_folders['Items']);

                child_folders['Items'].forEach(element => {
                    var url = element['BrowseDocumentsUrl'];
                    var splitUrl = url.split('/');
                    element['folder_id'] = splitUrl[7];
                  });

                // console.log(child_folders);

                res.render('all_vendors', {vendors: child_folders['Items']});

            });
        });
    })
});

module.exports = router;
