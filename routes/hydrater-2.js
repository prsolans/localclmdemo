var express = require('express');
var FormData = require('form-data');
var Blob = require('blob');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
const fetch = require('node-fetch');
/* GET home page. */
router.get('/', function (req, res, next) {

  var client_id = req.app.locals.client_id;
  var client_secret = req.app.locals.client_secret;
  var auth_URL = req.app.locals.auth_URL;
  var auth_token;

  var root_folder_id = req.app.locals.root_folder_id;
  var root_folder_data;
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

  async function getRootFolder(auth_token, callback){
    var uri = 'https://apina11.springcm.com//v201411/folders/' + root_folder_id;

    // console.log(uri);
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

  async function copyFile(auth_token, callback) {

    // var copyTask = '{"DocumentsToCopy": "'+ hydrater_doc_id +'", "DestinationFolder": "'+ root_folder_id +'", "DestinationDocumentName": "ABC.docx", "Status": "", "Href": "" }';

    var uri = 'https://apidownloadna11.springcm.com/v201411/documents/' + hydrater_doc_id;
    // var headers = {'Authorization':'bearer' + auth_token};

    console.log(uri);
    // const documentObject = getDocument(auth_token, getDocumentURI);
    // const documentObject = fetch(getDocumentURI, {method: 'POST', headers: headers}).then((res => {return res.text()}))
    // console.log(documentObject);


    // const thisDoc = util.promisify(getDocument(auth_token, getDocumentURI))

    // var copyTask = '{ "DocumentsToCopy": "", "FoldersToCopy": [ "Folder" ], "DocumentResults": [ "Document" ], "FolderResults": [ "Folder" ], "FailedDocuments": [ { "Source": "Document", "Reason": "" } ], "FailedFolders": [ { "Source": "Folder", "Reason": "" } ], "ResultDocument": "Document", "Message": "", "DownloadUrl": "", "DestinationFolder": "'+ root_folder_id +'", "DestinationDocumentName": "PRS1.docx", "Status": "", "Href": "" }';
    // var json = JSON.parse(copyTask);

    // console.log(copyTask);
    // var uri = 'https://apina11.springcm.com/v201411/copytasks';
    var xhr = new XMLHttpRequest();

    // var formData = new FormData();

    // formData.append('file', new Blob(['test payload'], { type: 'text/csv' }));


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

  async function triggerWorkflow(auth_token, callback) {
    var uri = 'https://apina11.springcm.com/v201411/workflows/';

    var data = '<root> <Name>Hydrater Function</Name> <StartDate></StartDate> <EndDate></EndDate> <Status></Status> <Info></Info> <Params></Params> <WorkflowDocuments> <Items>Document</Items> <Href></Href> <Offset>0</Offset> <Limit>0</Limit> <First></First> <Previous></Previous> <Next></Next> <Last></Last> <Total>0</Total> </WorkflowDocuments> <Href></Href> </root>';

    console.log(data);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', uri, true);
    xhr.setRequestHeader('Authorization', 'bearer ' + auth_token);

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

  getToken(auth_URL, function () {
    // "this" is the XHR object here!
    var json = JSON.parse(this.responseText);

    // now do something with resp
    auth_token = json.access_token;

    // console.log(auth_token);

    getRootFolder(auth_token, function () {
      root_folder_data = JSON.parse(this.responseText);

      var root_folder_name = root_folder_data.Name;
      // console.log(root_folder_name);

      var root_folder_upload_link = root_folder_data.Documents.CreateDocumentHref;

      // console.log(root_folder_upload_link);
      console.log(auth_token);

      triggerWorkflow(auth_token, function() {
        var response = JSON.parse(this.responseText);
        console.log(this);
        console.log('5');

      });



      // copyFile(auth_token, function() {
      //   var response = JSON.parse(this.responseText);
      //   console.log(response);
      //   console.log('5');

      // });

    });
  })
});

module.exports = router;
