var SpringSDK =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./wwwroot/SDK/Authentication/StaticTokenAuthentication.ts":
/*!*****************************************************************!*\
  !*** ./wwwroot/SDK/Authentication/StaticTokenAuthentication.ts ***!
  \*****************************************************************/
/*! exports provided: StaticTokenAuthenication */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticTokenAuthenication", function() { return StaticTokenAuthenication; });
class StaticTokenAuthenication {
    constructor(token) {
        this._token = token;
    }
    AccessToken() {
        var p = new Promise((res, rej) => { res(this._token); });
        return p;
    }
}


/***/ }),

/***/ "./wwwroot/SDK/Model/DocumentSearch.ts":
/*!*********************************************!*\
  !*** ./wwwroot/SDK/Model/DocumentSearch.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./wwwroot/SDK/Requests/DocumentRequest.ts":
/*!*************************************************!*\
  !*** ./wwwroot/SDK/Requests/DocumentRequest.ts ***!
  \*************************************************/
/*! exports provided: DocumentRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentRequest", function() { return DocumentRequest; });
class DocumentRequest {
    set ExpandAttributeGroups(value) {
        if ((this._expandAttributeGroups != value)) {
            this._id = this._scmsvc.getIDfromHref(this._document.Href);
            this._document = undefined;
            this._expandAttributeGroups = value;
        }
    }
    get ExpandAttributeGroups() {
        return this._expandAttributeGroups;
    }
    constructor(svc, documentId, documentPath, document) {
        this._id = documentId;
        this._scmsvc = svc;
        this._document = document;
        this._path = documentPath;
    }
    get Document() {
        var p = new Promise((res, rej) => {
            if ((this._document != undefined)) {
                this._id = this._scmsvc.getIDfromHref(this._document.Href);
                res(this._document);
                //return;
            }
            if (this._path != undefined) {
                this._scmsvc.Requestor.Get(`${this._scmsvc.GetObjectAPIUrl}/documents?path=${encodeURI(this._path)}&${this.ExpandDocument()}`).then((doc) => {
                    this._document = doc;
                    this._id = this._scmsvc.getIDfromHref(this._document.Href);
                    res(this._document);
                });
                //return _folder;
            }
            if ((this._id != undefined)) {
                this._scmsvc.Requestor.Get(`${this._scmsvc.GetObjectAPIUrl}/documents/${this._id}?${this.ExpandDocument()}`).then((doc) => {
                    this._document = doc;
                    //this.id = this._scmsvc.getIDfromHref(this._folder.Href);
                    res(this._document);
                });
            }
        });
        return p;
    }
    ExpandDocument() {
        let expandString = [];
        //if (this._expandParentFolder == true) {
        //    expandString.push("ParentFolder");
        //}
        //if (this._expandDocuments == true) {
        //    expandString.push("Documents");
        //}
        //if (this._expandFolders == true) {
        //    expandString.push("Folders");
        //}
        //if (this._expandPath) {
        //    expandString.push("Path");
        //}
        //if (this._expandEosParentInfo) {
        //    expandString.push("EosParentInfo");
        //}
        //if (this._expandEosInfo) {
        //    expandString.push("Eosinfo");
        //}
        //if (this._expandShareLinks) {
        //    expandString.push("ShareLinks");
        //}
        if (this._expandAttributeGroups == true) {
            expandString.push("AttributeGroups");
        }
        //if (this._expandSecurity) {
        //    expandString.push("Security");
        //}
        //if ((expandString.length == 0)) {
        //    return "";
        //}
        return `expand=${expandString.join(',')}`;
    }
    DownloadDocumentById(id, acceptType, page, headers) {
        var p = new Promise((res, rej) => {
            if (page != undefined) {
                this._scmsvc.Requestor.GetStream(`${this._scmsvc.GetDownloadAPIUrl}/documents/${id}?page=${page}`, acceptType).then(root => {
                    res(root);
                }).catch(rej);
            }
            else {
                this._scmsvc.Requestor.GetStream(`${this._scmsvc.GetDownloadAPIUrl}/documents/${id}`, acceptType).then(root => {
                    res(root);
                }).catch(rej);
            }
        });
        return p;
    }
    getID() {
        return this._id;
    }
}


/***/ }),

/***/ "./wwwroot/SDK/Requests/FolderRequest.ts":
/*!***********************************************!*\
  !*** ./wwwroot/SDK/Requests/FolderRequest.ts ***!
  \***********************************************/
/*! exports provided: FolderRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FolderRequest", function() { return FolderRequest; });
class FolderRequest {
    set ExpandDocuments(value) {
        if ((this._expandDocuments != value)) {
            this._id = this._scmsvc.getIDfromHref(this._folder.Href);
            this._folder = undefined;
            this._expandDocuments = value;
        }
    }
    get ExpandDocuments() {
        return this._expandDocuments;
    }
    set ExpandFolders(value) {
        if ((this._expandFolders != value)) {
            this._id = this._scmsvc.getIDfromHref(this._folder.Href);
            this._folder = undefined;
            this._expandFolders = value;
        }
    }
    get ExpandFolders() {
        return this._expandFolders;
    }
    set ExpandPath(value) {
        if ((this._expandPath != value)) {
            this._folder = undefined;
        }
    }
    get ExpandPath() {
        return this._expandPath;
    }
    set ExpandEosParentInfo(value) {
        if ((this._expandEosParentInfo != value)) {
            this._folder = undefined;
        }
    }
    get ExpandEosParentInfo() {
        return this._expandEosParentInfo;
    }
    set ExpandEosInfo(value) {
        if ((this._expandEosInfo != value)) {
            this._folder = undefined;
        }
    }
    get ExpandEosInfo() {
        return this._expandEosInfo;
    }
    set ExpandShareLinks(value) {
        if ((this._expandShareLinks != value)) {
            this._folder = undefined;
        }
    }
    get ExpandShareLinks() {
        return this._expandShareLinks;
    }
    set ExpandAttributeGroups(value) {
        if ((this._expandAttributeGroups != value)) {
            this._id = this._scmsvc.getIDfromHref(this._folder.Href);
            this._folder = undefined;
            this._expandAttributeGroups = value;
        }
    }
    get ExpandAttributeGroups() {
        return this._expandAttributeGroups;
    }
    set ExpandSecurity(value) {
        if ((this._expandSecurity != value)) {
            this._folder = undefined;
        }
    }
    get ExpandSecurity() {
        return this._expandSecurity;
    }
    constructor(svc, folderId, path, folder) {
        this._id = folderId;
        this._scmsvc = svc;
        this._folder = folder;
        this._path = path;
    }
    get Folder() {
        var p = new Promise((res, rej) => {
            if ((this._folder != undefined)) {
                this._id = this._scmsvc.getIDfromHref(this._folder.Href);
                res(this._folder);
                //return;
            }
            if (this._path != undefined) {
                this._scmsvc.Requestor.Get(`${this._scmsvc.GetObjectAPIUrl}/folders?path=${encodeURI(this._path)}&${this.ExpandFolder()}`).then((fol) => {
                    this._folder = fol;
                    this._id = this._scmsvc.getIDfromHref(this._folder.Href);
                    res(this._folder);
                });
                //return _folder;
            }
            if ((this._id != undefined)) {
                this._scmsvc.Requestor.Get(`${this._scmsvc.GetObjectAPIUrl}/folders/${this._id}?${this.ExpandFolder()}`).then((fol) => {
                    this._folder = fol;
                    //this.id = this._scmsvc.getIDfromHref(this._folder.Href);
                    res(this._folder);
                });
            }
        });
        return p;
    }
    //public GetAllSubfolders(): Promise<Array<FolderRequest>> {
    //    var p = new Promise<Array<FolderRequest>>((res, rej) => {
    //        this.Folder.then((folder) => {
    //            let res = this._scmsvc.Requestor.Get<SpringCMItem<Folder>>(`${folder.Href}/folders?limit=${this._scmsvc.DefaultQueryBatch}`).then((folders) => {
    //                var frs:Array<FolderRequest> = [];
    //                for (var i = 0; i < folders.Items.length;i++) {
    //                    frs.push(new FolderRequest(this._scmsvc, undefined, undefined, folders.Items[i]));
    //                }
    //                if ((folders.Items.length < folders.Total)) {
    //                    while ((folders.Next != undefined)) {
    //                        folders = this._scmsvc.Requestor.Get<SpringCMItem<Folder>>(`${folders.Next}`);
    //                        lst.AddRange(res.Items.Select(() => { }, new FolderRequest(a, _scmsvc)));
    //                    }
    //                }
    //                return lst;
    //            })
    //        })
    //    })
    //}
    //public UploadDocument(file: System.IO.Stream, FileName: string): Task < DocumentRequest > {
    //                                    return this._scmsvc.UploadDocument(this.Folder, file, FileName);
    //                                }
    //public Delete(): Task < Folder > {
    //                                    return this._scmsvc.DeleteFolder(this.Folder);
    //                                }
    //public CreateSubfolder(name: string): Task < FolderRequest > {
    //                                    let fol = [][
    //                                        Name = name,
    //                                        ParentFolder = this.Folder];
    //                                    return _scmsvc.CreateFolder(fol);
    //                                }
    //public GetAllDocuments(): Task < List < DocumentRequest >> {
    //                                    let res = ((this._scmsvc.requestor.Get
    //                                        < (SpringCMItem < Document))
    //                                        + "{Folder.Href}/documents?limit={_scmsvc.DefaultQueryBatch}&{ExpandFolder()}");
    //                                    let lst = res.Items.Select(() => { }, new DocumentRequest(a, _scmsvc)).ToList();
    //                                    if((res.Items.Count < res.Total)) {
    //                                    while ((res.Next != null)) {
    //                                        res = ((this._scmsvc.requestor.Get
    //                                            < (SpringCMItem < Document))
    //                                            + "{res.Next}");
    //                                        lst.AddRange(res.Items.Select(() => { }, new DocumentRequest(a, _scmsvc)));
    //                                    }
    //                                }
    //                                return lst;
    //                            }
    ExpandFolder() {
        let expandString = [];
        if (this._expandParentFolder == true) {
            expandString.push("ParentFolder");
        }
        if (this._expandDocuments == true) {
            expandString.push("Documents");
        }
        if (this._expandFolders == true) {
            expandString.push("Folders");
        }
        if (this._expandPath) {
            expandString.push("Path");
        }
        if (this._expandEosParentInfo) {
            expandString.push("EosParentInfo");
        }
        if (this._expandEosInfo) {
            expandString.push("Eosinfo");
        }
        if (this._expandShareLinks) {
            expandString.push("ShareLinks");
        }
        if (this._expandAttributeGroups == true) {
            expandString.push("AttributeGroups");
        }
        if (this._expandSecurity) {
            expandString.push("Security");
        }
        if ((expandString.length == 0)) {
            return "";
        }
        return `expand=${expandString.join(',')}`;
    }
}


/***/ }),

/***/ "./wwwroot/SDK/Service/BrowserHttpRequest.ts":
/*!***************************************************!*\
  !*** ./wwwroot/SDK/Service/BrowserHttpRequest.ts ***!
  \***************************************************/
/*! exports provided: BrowserHttpRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserHttpRequest", function() { return BrowserHttpRequest; });
class BrowserHttpRequest {
    constructor(auth) {
        this.Get = (url, headers = undefined) => {
            return new Promise((res, rej) => {
                this.getHeader(headers).then((populatedHeaders) => {
                    $.ajax(url, { method: "GET", data: undefined, headers: populatedHeaders }).done(data => { res(data); }).fail(rej);
                }, rej);
            });
        };
        this.Delete = (url, headers = undefined) => {
            return new Promise((res, rej) => {
                this.getHeader(headers).then((populatedHeaders) => {
                    $.ajax(url, { method: "DELETE", data: undefined, headers: populatedHeaders }).done(data => { res(data); }).fail(rej);
                }, rej);
            });
        };
        this.Patch = (url, body, headers = undefined) => {
            return new Promise((res, rej) => {
                this.getHeader(headers).then((populatedHeaders) => {
                    $.ajax(url, { method: "PATCH", data: JSON.stringify(body), headers: populatedHeaders }).done(data => { res(data); }).fail(rej);
                }, rej);
            });
        };
        this.MakeCall = (url, body, headers, method) => {
            return new Promise((res, rej) => {
                this.getHeader(headers).then((populatedHeaders) => {
                    $.ajax(url, { method: method, data: JSON.stringify(body), headers: populatedHeaders }).done(data => { res(data); }).fail(rej);
                }, rej);
            });
        };
        this.GetStream = (url, acceptType, headers = undefined) => {
            return new Promise((res, rej) => {
                this.getAuthHeader(headers).then((authBearer) => {
                    var req = new XMLHttpRequest();
                    req.open("GET", url, true);
                    req.responseType = "arraybuffer";
                    req.setRequestHeader("Accept", acceptType);
                    req.setRequestHeader("Authorization", authBearer);
                    req.onload = function (event) {
                        var responseText = req.response;
                        if (req.status == 404) {
                            res();
                        }
                        else {
                            res(responseText);
                        }
                    };
                    req.send();
                }, rej);
            });
        };
        this.getHeader = (currentHeader) => {
            if (currentHeader == undefined) {
                currentHeader = [];
            }
            if (currentHeader["accept"] == undefined) {
                currentHeader["accept"] = "application/json";
            }
            if (currentHeader["Content-Type"] == undefined) {
                currentHeader["Content-Type"] = "application/json";
            }
            //console.log(currentHeader);
            var p = new Promise((res, rej) => {
                if (currentHeader["Authorization"] == undefined) {
                    // console.log("Authorization is not already set");
                    this.Authenticator.AccessToken().then((token) => {
                        currentHeader["Authorization"] = `bearer ${token}`;
                        res(currentHeader);
                    }, rej);
                }
                else {
                    //  console.log("Authorization is already set");
                    res(currentHeader);
                }
            });
            return p;
        };
        this.getAuthHeader = (authToken) => {
            var p = new Promise((res, rej) => {
                if (authToken == undefined) {
                    this.Authenticator.AccessToken().then((token) => {
                        authToken = `bearer ${token}`;
                        res(authToken);
                    }, rej);
                }
                else {
                    //  console.log("Authorization is already set");
                    res(authToken);
                }
            });
            return p;
        };
        this.Authenticator = auth;
    }
    Put(url, body, headers) {
        return new Promise((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                $.ajax(url, { method: "PUT", data: JSON.stringify(body), headers: populatedHeaders }).done(data => { res(data); }).fail(rej);
            }, rej);
        });
    }
    Post(url, body, headers) {
        return new Promise((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                $.ajax(url, { method: "POST", data: JSON.stringify(body), headers: populatedHeaders }).done(data => { res(data); }).fail(rej);
            }, rej);
        });
    }
}


/***/ }),

/***/ "./wwwroot/SDK/Service/BrowserRequestFactory.ts":
/*!******************************************************!*\
  !*** ./wwwroot/SDK/Service/BrowserRequestFactory.ts ***!
  \******************************************************/
/*! exports provided: RequestorFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestorFactory", function() { return RequestorFactory; });
/* harmony import */ var _BrowserHttpRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BrowserHttpRequest */ "./wwwroot/SDK/Service/BrowserHttpRequest.ts");

class RequestorFactory {
}
RequestorFactory.GetRequestor = (auth) => {
    if (typeof window === 'undefined') {
        // return new NodeHttpRequest(auth);
    }
    else {
        //  if (SpringCM.API != undefined) {
        //return new EformHttpRequest();
        // }
        // else {
        return new _BrowserHttpRequest__WEBPACK_IMPORTED_MODULE_0__["BrowserHttpRequest"](auth);
        //}
        // return null;
    }
};


/***/ }),

/***/ "./wwwroot/SDK/Service/BrowserSpringCMService.ts":
/*!*******************************************************!*\
  !*** ./wwwroot/SDK/Service/BrowserSpringCMService.ts ***!
  \*******************************************************/
/*! exports provided: StaticTokenAuthenication, FolderRequest, DocumentSearch, DocumentRequest, SpringCMService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpringCMService", function() { return SpringCMService; });
/* harmony import */ var _SpringCMService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpringCMService */ "./wwwroot/SDK/Service/SpringCMService.ts");
/* harmony import */ var _BrowserRequestFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BrowserRequestFactory */ "./wwwroot/SDK/Service/BrowserRequestFactory.ts");
/* harmony import */ var _Authentication_StaticTokenAuthentication__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Authentication/StaticTokenAuthentication */ "./wwwroot/SDK/Authentication/StaticTokenAuthentication.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StaticTokenAuthenication", function() { return _Authentication_StaticTokenAuthentication__WEBPACK_IMPORTED_MODULE_2__["StaticTokenAuthenication"]; });

/* harmony import */ var _Requests_FolderRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Requests/FolderRequest */ "./wwwroot/SDK/Requests/FolderRequest.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FolderRequest", function() { return _Requests_FolderRequest__WEBPACK_IMPORTED_MODULE_3__["FolderRequest"]; });

/* harmony import */ var _Model_DocumentSearch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Model/DocumentSearch */ "./wwwroot/SDK/Model/DocumentSearch.ts");
/* harmony import */ var _Model_DocumentSearch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Model_DocumentSearch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DocumentSearch", function() { return _Model_DocumentSearch__WEBPACK_IMPORTED_MODULE_4__["DocumentSearch"]; });

/* harmony import */ var _Requests_DocumentRequest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Requests/DocumentRequest */ "./wwwroot/SDK/Requests/DocumentRequest.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DocumentRequest", function() { return _Requests_DocumentRequest__WEBPACK_IMPORTED_MODULE_5__["DocumentRequest"]; });







class SpringCMService extends _SpringCMService__WEBPACK_IMPORTED_MODULE_0__["SpringCMServiceBase"] {
    constructor(auth, datacenter) {
        super(auth, datacenter);
        this.Requestor = _BrowserRequestFactory__WEBPACK_IMPORTED_MODULE_1__["RequestorFactory"].GetRequestor(auth);
    }
}


/***/ }),

/***/ "./wwwroot/SDK/Service/SpringCMService.ts":
/*!************************************************!*\
  !*** ./wwwroot/SDK/Service/SpringCMService.ts ***!
  \************************************************/
/*! exports provided: SpringCMServiceBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpringCMServiceBase", function() { return SpringCMServiceBase; });
/* harmony import */ var _validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validator */ "./wwwroot/SDK/Service/validator.ts");
/* harmony import */ var _Requests_FolderRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Requests/FolderRequest */ "./wwwroot/SDK/Requests/FolderRequest.ts");
/* harmony import */ var _Requests_DocumentRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Requests/DocumentRequest */ "./wwwroot/SDK/Requests/DocumentRequest.ts");



class SpringCMServiceBase {
    constructor(auth, datacenter) {
        this.ApplicationVersion = "v201411";
        this.Datacenter = datacenter;
        this.GetObjectAPIUrl = `https://api${this.Datacenter}.springcm.com/${this.ApplicationVersion}`;
        this.GetUploadAPIUrl = `https://apiupload${this.Datacenter}.springcm.com/${this.ApplicationVersion}`;
        this.GetDownloadAPIUrl = `https://apidownload${this.Datacenter}.springcm.com/${this.ApplicationVersion}`;
    }
    GetCurrentAccount() {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/accounts/current`);
    }
    UpdateAccount(act) {
        return this.Requestor.Patch(act.Href, act);
    }
    GetCurrentAccountAttributeGroups() {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/accounts/current/attributegroups`);
    }
    //public QueryNext(springCMItem: SpringCMItem<T>): Promise<SpringCMItem<T>> {
    //    return this.Requestor.Get<SpringCMItem<T>>(`${this.springCMItem.Next}`);
    //}
    GetAllDocLauncherConfigs() {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/doclauncherconfigurations`);
    }
    GetAllPermissionSets() {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/permissionsets`);
    }
    GetDocLauncherTask(IdorHref) {
        let href = IdorHref;
        if (_validator__WEBPACK_IMPORTED_MODULE_0__["Validator"].isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/doclauncherTasks/${IdorHref}`;
        }
        return this.Requestor.Get(href);
    }
    CreateDocLauncherTask(DocLauncherTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/DocLauncherTasks`, DocLauncherTask);
    }
    GetAllContacts() {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/contacts`);
    }
    GetContactById(Id) {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/contacts/{Id}`);
    }
    CreateContact(contact) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/contacts/`, contact);
    }
    UpdateContact(contact) {
        return this.Requestor.Put(contact.Href, contact);
    }
    DeleteContact(contact) {
        return this.Requestor.Delete(contact.Href);
    }
    GetWorkflow(IdorHref) {
        let href = IdorHref;
        if (_validator__WEBPACK_IMPORTED_MODULE_0__["Validator"].isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workflows/${IdorHref}`;
        }
        return this.Requestor.Get(href);
    }
    StartWorkflow(workflow) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/workflows/`, (workflow));
    }
    SignalWorkflow(workflow, data) {
        return this.Requestor.Post(`${workflow.Href}/signal`, `{"data":"${data}" }`);
    }
    DeleteWorkflow(workflow) {
        return this.Requestor.Delete(workflow.Href);
    }
    GetWorkflowQueue(IdorHref) {
        //         let id: Guid;
        let href = IdorHref;
        if (_validator__WEBPACK_IMPORTED_MODULE_0__["Validator"].isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workflowqueues/${IdorHref}`;
        }
        return;
    }
    GetWorkflowQueueWorkItems(IdorHref) {
        //         let id: Guid;
        let href = IdorHref;
        if (_validator__WEBPACK_IMPORTED_MODULE_0__["Validator"].isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workflowqueues/${IdorHref}/workitems`;
        }
        return;
    }
    GetWorkItem(IdorHref, assignee = false, documents = false, assigneeInstructions = false, workflow = false, selections = false) {
        //        let id: Guid;
        let href = IdorHref;
        if (_validator__WEBPACK_IMPORTED_MODULE_0__["Validator"].isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workitems/${IdorHref}`;
        }
        let expandString = [];
        if (assignee) {
            expandString.push("Assignee");
        }
        if (documents) {
            expandString.push("Documents");
        }
        if (assigneeInstructions) {
            expandString.push("AssigneeInstructions");
        }
        if (workflow) {
            expandString.push("Workflow");
        }
        if (selections) {
            expandString.push("Selections");
        }
        if ((expandString.length == 0)) {
            return this.Requestor.Get(href);
        }
        let expand = `expand=${expandString.join(',')}`;
        return this.Requestor.Get(`${href}?expand=${expand}`);
    }
    ;
    //        ///  <summary>
    //        ///  Method accepts an ID or an HREF
    //        ///  Brings back documents assigned to a user via SpringCM Promise
    //        ///  </summary>
    //        ///  <param name="IdorHref"></param>
    //        ///  <returns>Returns a list of documents associated to the Promises assigned to a user</returns>
    GetWorkItemDocuments(IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (_validator__WEBPACK_IMPORTED_MODULE_0__["Validator"].isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workitems/{IdorHref}/documents`;
        }
        return this.Requestor.Get(href);
    }
    //        ///  <summary>
    //        ///   Method accepts an ID or an HREF
    //        ///   Currently this method does not work but may in the future.
    //        ///  </summary>
    //        ///  <param name="workitem"></param>
    //        ///  <param name="IdorHref"></param>
    //        ///  <returns></returns>
    UpdateWorkitem(workitem, IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (_validator__WEBPACK_IMPORTED_MODULE_0__["Validator"].isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workitems/{IdorHref}`;
        }
        return this.Requestor.Patch("{href}", (workitem));
    }
    GetDocumentReminder(IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (_validator__WEBPACK_IMPORTED_MODULE_0__["Validator"].isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/DocumentReminders/{id}`;
        }
        return this.Requestor.Get((href + "?expand=Documents,RecipientUsers,RecipientGroups"));
    }
    CreateDocumentReminder(documentReminder) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/DocumentReminders/`, (documentReminder));
    }
    UpdateDocumentReminder(documentReminder) {
        return this.Requestor.Put(documentReminder.Href, (documentReminder));
    }
    DeleteDocumentReminder(documentReminder) {
        return this.Requestor.Delete(documentReminder.Href);
    }
    //        public GetGroup(IdorHref: string, loadGroupMembers: boolean = false): Promise<Group> {
    //    let id: Guid;
    //    let href = IdorHref;
    //    let expand = "";
    //    if(loadGroupMembers) {
    //        expand = "?expand=GroupMembers";
    //    }
    //            if(Guid.TryParse(IdorHref, /* out */id)) {
    //    href = "{GetObjectAPIUrl}/Groups/{IdorHref}{expand}";
    //}
    //return this.Requestor.Get<Group>(href);
    //        }
    GetGroupMembers(IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (_validator__WEBPACK_IMPORTED_MODULE_0__["Validator"].isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/Groups/{IdorHref}`;
        }
        return this.Requestor.Get("{href}/groupmembers");
    }
    CreateGroup(group) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/groups/`, (group));
    }
    UpdateGroup(group, overwriteMembers = false) {
        if (overwriteMembers) {
            return this.Requestor.Put("{group.Href}", (group));
        }
        return this.Requestor.Patch("{group.Href}", (group));
    }
    DeleteGroup(group) {
        return this.Requestor.Delete(group.Href);
    }
    //public GetCurrentUser(): Promise<UserRequest> {
    //    return new UserRequest(this.Requestor.Get<User>(`${this.GetObjectAPIUrl}/Users/Current`), this);
    //}
    //public GetAllUsers(): Promise<List<UserRequest>> {
    //    let users = this.Requestor.Get<List<User>>(`${this.GetObjectAPIUrl}/Users/`);
    //    return users.Select(() => { }, new UserRequest(a, this)).ToList();
    //}
    //public CreateUser(user: UserRequest): Promise<UserRequest> {
    //    return this.CreateUser(user.User);
    //}
    //public CreateUser(user: User): Promise<UserRequest> {
    //    return new UserRequest(this.Requestor.Post<User>(`${this.GetObjectAPIUrl}/users/`, (user)), this);
    //}
    //public DeleteUser(user: UserRequest): Promise<User> {
    //    return this.DeleteUser(user.User);
    //}
    //public DeleteUser(user: User): Promise<User> {
    //    return this.Requestor.Delete<User>(user.Href);
    //}
    //public GetUser(IdorHref: string): Promise<UserRequest> {
    //    //			let id: Guid;
    //    let href = IdorHref;
    //    if (Validator.isUUID(IdorHref)) {
    //        href = `${this.GetObjectAPIUrl}/users/{IdorHref}`;
    //    }
    //    return new UserRequest(this.Requestor.Get<User>(href), this);
    //}
    //public UpdateUser(user: UserRequest, overwriteGroups: boolean = false): Promise<UserRequest> {
    //    return this.UpdateUser(user.User, overwriteGroups);
    //}
    //public UpdateUser(user: User, overwriteGroups: boolean = false): Promise<UserRequest> {
    //    if (overwriteGroups) {
    //        return new UserRequest(this.Requestor.Put<User>("{user.Href}", (user)), this);
    //    }
    //    return new UserRequest(this.Requestor.Patch<User>("{user.Href}", (user)), this);
    //}
    GetCurrentUsersWatchedDocuments() {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/users/current/watcheddocuments`);
    }
    GetCurrentUsersWatchedDocumentsProcessTractingActivites() {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/users/current/watcheddocumentsprocesstrackingactivities`);
    }
    GetCurrentUsersWorkItems(IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (_validator__WEBPACK_IMPORTED_MODULE_0__["Validator"].isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/users/{IdorHref}/workitems`;
        }
        return this.Requestor.Get(href);
    }
    //public UploadDocument(folder: Folder, file: Stream, fileName: string): Promise<DocumentRequest> {
    //    return new DocumentRequest(this.Requestor.PostFile(`${this.GetUploadAPIUrl}/folders/{getIDfromHref(folder.Href)}/documents`, file, fileName), this);
    //}
    //public MakeSafeFolderName(folderName: string): string {
    //    // return folderName.replace(/[.\?]/g,'')
    //    // return folderName.replace(/.|\|?/g,'')
    //    return folderName.replace(".", "_").replace("\", "_").replace(" / ", "_").replace(": ", "_").replace(" * ", "_").replace(" ? ", "_").replace(""""", ", _, (").replace(" < ", "), _, (").replace(" > ", "), _, "".replace(" | ", "_"));
    //        }
    //public MakeSafePathName(folderName: string): string {
    //    return folderName.replace(".", "_").replace(":", "_").replace("*", "_").replace("?", "_").replace(""""", ", _, (").replace(" < ", "), _, (").replace(" > ", "), _, "".replace("|", "_"));
    //}
    //public CheckInDocument(id: string, file: Stream, fileName: string): Promise<DocumentRequest> {
    //    return new DocumentRequest(this.Requestor.PostFile(`${this.GetUploadAPIUrl}/documents/{id}`, file, fileName), this);
    //}
    //        public FindOrCreateFolder(path: string): Promise<FolderRequest> {
    //    try {
    //        let fldrreq = this.GetFolderByPath(this.MakeSafePathName(path));
    //        let fldr = fldrreq.Folder;
    //        return fldrreq;
    //    }
    //            catch(ag /*:AggregateException*/) {
    //        let ae = (<ApiException>(ag.InnerExceptions.First()));
    //        if ((ae != null)) {
    //            if ((ae.ApiError.Error.HttpStatusCode == 404)) {
    //                return this.findOrCreateInParent(this.GetRootFolder(), path);
    //            }
    //            else {
    //                throw ae;
    //            }
    //        }
    //        else {
    //            throw ag;
    //        }
    //    }
    //            return new FolderRequest("123", this);
    //}
    //        private findOrCreateInParent(parent: FolderRequest, folderPath: string): Promise<FolderRequest> {
    //    let paths = folderPath.Replace("\", " / ").Trim('/').Split('/').ToList();
    //            let folder = parent.GetAllSubfolders().FirstOrDefault(() => { }, (a.Folder.Name.ToLower() == paths[0].ToLower()));
    //    if((folder == null)) {
    //    folder = parent.CreateSubfolder(this.MakeSafeFolderName(paths[0]));
    //}
    //paths.RemoveAt(0);
    //if ((paths.Count > 0)) {
    //    folder = this.findOrCreateInParent(folder, this.MakeSafePathName(string.Join("/", paths)));
    //}
    //return folder;
    //        }
    CheckOutDocument(id) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/documents/{id}/lock`, "");
    }
    //public MoveDocument(doc: Document, parentFolder: Folder): Promise<DocumentRequest> {
    //    doc.ParentFolder = parentFolder;
    //    return this.UpdateDocument(doc);
    //}
    CancelCheckOutDocument(id) {
        return this.Requestor.Delete(`${this.GetObjectAPIUrl}/documents/{id}/lock`);
    }
    //        public QueryAll(springCMItem: SpringCMItem<T>): Promise<List< T >> {
    //    let lst: List<T> = new List<T>();
    //    let nextRes: SpringCMItem<T> = new SpringCMItem<T>();
    //    lst.AddRange(springCMItem.Items);
    //    lst.AddRange(nextRes.Items);
    //    while((nextRes.Next != null)) {
    //    nextRes = ((this.requestor.Get
    //        < (SpringCMItem < T))
    //        + "{nextRes.Next}");
    //    lst.AddRange(nextRes.Items);
    //}
    //return lst;
    //        }
    GetAttributeGroupFields(idOrHref) {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/attributegroups/${idOrHref}`);
    }
    //return this.Requestor.Get<AttributeGroups>(idOrHref);
    //        }
    getIDfromHref(href) {
        let last = (href.lastIndexOf('/') + 1);
        let end = href.length;
        let diff;
        return href.substring(last, diff);
    }
    GetRootFolder() {
        var p = new Promise((res, rej) => {
            this.Requestor.Get(`${this.GetObjectAPIUrl}/folders?systemfolder=root`).then(root => {
                res(new _Requests_FolderRequest__WEBPACK_IMPORTED_MODULE_1__["FolderRequest"](this, undefined, undefined, root));
            }).catch(rej);
        });
        return p;
    }
    //public GetUserHomeFolder(): Promise<FolderRequest> {
    //    return new FolderRequest(this, "", "",this.Requestor.Get<Folder>(`${this.GetObjectAPIUrl}/folders?systemfolder=home`));
    //}
    //public GetEOSRootFolder(): Promise<FolderRequest> {
    //    return new FolderRequest(this.Requestor.Get<Folder>(`${this.GetObjectAPIUrl}/folders?systemfolder=othersources`), this);
    //}
    //public GetTrashFolder(): Promise<FolderRequest> {
    //    return new FolderRequest(this.Requestor.Get<Folder>(`${this.GetObjectAPIUrl}/folders?path=trash`), this);
    //}
    GetFolderByPath(path) {
        //return new Promise<FolderRequest>(this, null, path, undefined);
        var p = new Promise((res, rej) => {
            this.Requestor.Get(`${this.GetObjectAPIUrl}/folders?path=${path}`).then(root => {
                res(new _Requests_FolderRequest__WEBPACK_IMPORTED_MODULE_1__["FolderRequest"](this, undefined, undefined, root));
            }).catch(rej);
        });
        return p;
    }
    GetFolderById(id) {
        //return new Promise<FolderRequest>(this, null, path, undefined);
        var p = new Promise((res, rej) => {
            this.Requestor.Get(`${this.GetObjectAPIUrl}/folders/${id}`).then(root => {
                res(new _Requests_FolderRequest__WEBPACK_IMPORTED_MODULE_1__["FolderRequest"](this, undefined, undefined, root));
            }).catch(rej);
        });
        return p;
    }
    //public CreateFolder(folder: Folder): Promise<FolderRequest> {
    //    return new FolderRequest(this.Requestor.Post<Folder>(`${this.GetObjectAPIUrl}/Folders`, (folder)), this);
    //}
    CreateFolder(name, path) {
        var parentFolder;
        let parent = this.GetFolderByPath(path).then(function (result) {
            parentFolder = result.Folder;
            result.ExpandFolders = true;
        });
        const folder = {
            Name: name,
            ParentFolder: parentFolder
        };
        //let folder = [][
        //    Name = name,
        //    ParentFolder = parent;//(await parent.Folder);
        var p = new Promise((res, rej) => {
            this.Requestor.Post(`${this.GetObjectAPIUrl}/folders`, (folder)), this;
        });
        return p;
        //return new FolderRequest(this.Requestor.Post<Folder>(`${this.GetObjectAPIUrl}/Folders`, (folder)), this);
    }
    //public MoveFolder(folderToMove: Folder, destinationFolder: Folder): Promise<FolderRequest> {
    //    folderToMove.ParentFolder = destinationFolder;
    //    return this.UpdateFolder(folderToMove);
    //}
    //public UpdateFolder(folder: Folder, overwriteAllAttributes: boolean = false): Promise<FolderRequest> {
    //    if (!overwriteAllAttributes) {
    //        return new FolderRequest(this.Requestor.Patch<Folder>(folder.Href, (folder)), this);
    //    }
    //    else {
    //        return new FolderRequest(this.Requestor.Put<Folder>(folder.Href, (folder)), this);
    //    }
    //}
    FindOrCreateEOSFolder(folderName, path, objectType, objectId) {
        const eos = {
            Name: folderName,
            ObjectId: objectId,
            ObjectType: objectType,
            Path: path
        };
        const fld = {
            EosInfo: eos
        };
        var p = new Promise((res, rej) => {
            this.Requestor.Post(`${this.GetObjectAPIUrl}/folders`, (fld)).then(root => {
                res(new _Requests_FolderRequest__WEBPACK_IMPORTED_MODULE_1__["FolderRequest"](this, undefined, undefined, root));
            }).catch(rej);
        });
        return p;
        //var p = new Promise<FolderRequest>((res, rej) => {
        //    this.Requestor.Get<Folder>(`${this.GetObjectAPIUrl}/folders?systemfolder=root`).then(root => {
        //        res(new FolderRequest(this, undefined, undefined, root));
        //    }).catch(rej);
        //})
        //return p;
        //let fold = [][
        //    EosInfo = new EosInfo{
        //        Name = folderName, ObjectId = objectId, ObjectType = objectType, Path = pathUnknown];
        //return this.CreateFolder(fld);
    }
    DeleteFolder(folder) {
        return this.Requestor.Delete(folder.Href);
    }
    //public UpdateDocument(doc: DocumentRequest, overwriteAllValues: boolean = false): Promise<DocumentRequest> {
    //    var id = doc.getID();
    //    if (overwriteAllValues) {
    //        var p = new Promise<DocumentRequest>((res, rej) => {
    //            this.Requestor.Post<Document>(`${this.GetObjectAPIUrl}/documents/${id}`, doc).then(root => {
    //                res(new DocumentRequest(this, undefined, undefined, root));
    //            }).catch(rej);
    //        });
    //        return p;
    //    }
    //    else {
    //        var p = new Promise<DocumentRequest>((res, rej) => {
    //            this.Requestor.Patch<Document>(`${this.GetObjectAPIUrl}/documents/${id}`, doc).then(root => {
    //                res(new DocumentRequest(this, undefined, undefined, root));
    //            }).catch(rej);
    //        });
    //        return p;
    //    }
    //}
    //        public DeleteDocument(doc: Document): Promise<Document> {
    //    return this.Requestor.Delete<Document>(doc.Href);
    //}
    UpdateDocument(doc, overwriteAllValues = false) {
        var id = this.getIDfromHref(doc.Href);
        if (overwriteAllValues) {
            var p = new Promise((res, rej) => {
                this.Requestor.Post(`${this.GetObjectAPIUrl}/documents/${id}`, doc).then(root => {
                    res(new _Requests_DocumentRequest__WEBPACK_IMPORTED_MODULE_2__["DocumentRequest"](this, undefined, undefined, root));
                }).catch(rej);
            });
            return p;
        }
        else {
            var p = new Promise((res, rej) => {
                this.Requestor.Patch(`${this.GetObjectAPIUrl}/documents/${id}`, doc).then(root => {
                    res(new _Requests_DocumentRequest__WEBPACK_IMPORTED_MODULE_2__["DocumentRequest"](this, undefined, undefined, root));
                }).catch(rej);
            });
            return p;
        }
    }
    GetDocumentById(id) {
        var p = new Promise((res, rej) => {
            this.Requestor.Get(`${this.GetObjectAPIUrl}/documents/${id}`).then(root => {
                res(new _Requests_DocumentRequest__WEBPACK_IMPORTED_MODULE_2__["DocumentRequest"](this, undefined, undefined, root));
            }).catch(rej);
        });
        return p;
    }
    //        public GetDocumentByPath(path: String): Promise<DocumentRequest> {
    //    return new DocumentRequest(path, this);
    //}
    CreateDocumentSearchTask(documentSearchTask, LoadAttributes = false) {
        let expand = "";
        if (LoadAttributes) {
            expand = "?expand=AttributeGroups";
        }
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/documentsearchTasks${expand}`, (documentSearchTask));
    }
    //public Search(request: DocumentSearch, LoadAttributes: boolean = false): Promise<DocumentSearch> {
    //    let expand: string = "";
    //    if(LoadAttributes) {
    //        expand = "?expand=AttributeGroups";
    //    }
    //            let requestString: string = (request);
    //    return this.Requestor.Post<DocumentSearch>(`${this.GetObjectAPIUrl}/documentsearchPromises{expand}`, requestString);
    //}
    CreateShareLink(link) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/sharelinks`, (link));
    }
    UpdateShareLink(link) {
        return this.Requestor.Put(link.Href, (link));
    }
    DeleteShareLink(link) {
        return this.Requestor.Delete(link.Href);
    }
    GetShareLink(id) {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/sharelinks/{id}`);
    }
    CreateDocumentMergeTask(documentMergeTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/DocumentMergeTask`, (documentMergeTask));
    }
    CreateCopyTask(copyTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/CopyTask`, (copyTask));
    }
    CreateFolderSearchTask(folderSearchTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/foldersearchTask`, (folderSearchTask));
    }
    CreateFolderArchiveTask(folderArchiveTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/folderarchiveTask`, (folderArchiveTask));
    }
    CreateDocumentSplitTask(splitDocumentTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/splitdocumentTask`, (splitDocumentTask));
    }
    GetSignatureTask(IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (_validator__WEBPACK_IMPORTED_MODULE_0__["Validator"].isUUID(IdorHref)) {
            return this.Requestor.Get(`${this.GetObjectAPIUrl}/signatureTask/{IdorHref}`);
        }
        return this.Requestor.Get(href);
    }
    CreateSignatureTask(signatureTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/signatureTask`, (signatureTask));
    }
    DeleteSignatureTask(href) {
        return this.Requestor.Delete(href);
    }
    GetExternalReviewTask(IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (_validator__WEBPACK_IMPORTED_MODULE_0__["Validator"].isUUID(IdorHref)) {
            return this.Requestor.Get(`${this.GetObjectAPIUrl}/externalreviewTask/{IdorHref}`);
        }
        return this.Requestor.Get(href);
    }
    CreateExternalReviewTask(externalReviewTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/externalreviewTask`, (externalReviewTask));
    }
    DeleteExternalReviewTask(IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (_validator__WEBPACK_IMPORTED_MODULE_0__["Validator"].isUUID(IdorHref)) {
            return this.Requestor.Delete(`${this.GetObjectAPIUrl}/externalreviewTask/{IdorHref}`);
        }
        return this.Requestor.Delete(href);
    }
    GetExternalReviewTaskDocuments(Id) {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/externalreviewTask/{Id}/documents`);
    }
}


/***/ }),

/***/ "./wwwroot/SDK/Service/validator.ts":
/*!******************************************!*\
  !*** ./wwwroot/SDK/Service/validator.ts ***!
  \******************************************/
/*! exports provided: Validator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validator", function() { return Validator; });
class Validator {
}
Validator.uuid = {
    3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
};
Validator.isUUID = (str) => {
    var version = 'all';
    // this.assertString(str);
    var pattern = Validator.uuid[version];
    return pattern && pattern.test(str);
};


/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./wwwroot/SDK/Service/BrowserSpringCMService.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./wwwroot/SDK/Service/BrowserSpringCMService.ts */"./wwwroot/SDK/Service/BrowserSpringCMService.ts");


/***/ })

/******/ });
//# sourceMappingURL=SpringCMSDK.bundle.js.map