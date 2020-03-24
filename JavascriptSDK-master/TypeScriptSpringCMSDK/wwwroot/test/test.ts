import { secrets } from "./secrets.js" 
//import { expect } from 'chai'; 
import * as SpringCMSDK from "../../dist/SpringSDKNode.bundle.js"
import { Folder } from "../SDK/Model/Folder.js";
import { IHttpRequestor } from "../SDK/Service/IHttpRequest"


import { Account } from "../SDK/Model/Account";
//var assert = require('assert');
//import * as chai from "chai"
declare var chai;// = require("chai");
import { SpringCMItem } from "../SDK/Model/SpringCMItem.js";
import { AttributeGroups } from "../SDK/Model/AttributeGroup.js";
import { DocLauncher } from "../SDK/Model/DocLauncher.js";
import { PermissionSet } from "../SDK/Model/PermissionSet.js";

import { SpringCMServiceBase } from "../SDK/Service/SpringCMService";
import { IAuthenticator } from "../SDK/Authentication/IAuthentication.js";
import { FolderRequest } from "../SDK/Requests/FolderRequest.js";
import { DocLauncherTask } from "../SDK/Model/DocLauncherTask";


export class TestBase {

    public token;
    public auth: IAuthenticator;
    public service: SpringCMServiceBase;
    public chaisvc;
    constructor(svc: SpringCMServiceBase, _chai) {
        this.service = svc;
        this.auth = svc.Requestor.Authenticator;
        this.chaisvc = _chai;
    }


    public runTest = () => {
        var svc = this.service;
        var expect: Chai.ExpectStatic = this.chaisvc.expect;
        var that = this;
        var p = new Promise((r, e) => {
            describe('Spring CM Javascript SDK', function () {
                describe('Object Api ', function () {
                    it('Should get a token', (done) => {
                       // var sec = new secrets();

                        that.auth.AccessToken().then((res) => {
                            expect(res).to.be.a('string');
                            console.log(res);
                            r(res);
                            //token = res;
                            done()
                        }).catch((err) => { console.log(err); throw err; });
                    });

                    it('can get an account', function (done) {

                        //console.log(svc.Requestor);
                        svc.GetCurrentAccount().catch((err) => {
                            console.log(err);
                        }).then((act: Account) => {

                            expect(act.Name).to.be.a('string');
                            done();
                        });

                    });

                    it('can get the account Attributes', function (done) {

                        //console.log(svc.Requestor);
                        svc.GetCurrentAccountAttributeGroups().catch((err) => {
                            console.log(err);
                        }).then((act: SpringCMItem<AttributeGroups>) => {

                            expect(act.Items.length).to.be.greaterThan(0);
                            done();
                        });

                    });

                    it('should get the doc launcher configs', function (done) {


                        svc.GetAllDocLauncherConfigs().catch((err) => {
                            console.log(err);
                        }).then((act: SpringCMItem<DocLauncher>) => {

                            expect(act).to.not.eq(undefined);
                            done();
                        });

                    });

                    it('should get the permissionSets', function (done) {


                        svc.GetAllPermissionSets().catch((err) => {
                            console.log(err);
                        }).then((act: SpringCMItem<PermissionSet>) => {

                            expect(act).to.not.eq(undefined);
                            done();
                        });

                    });

                    it('should get the root folder', function (done) {


                        svc.GetRootFolder().catch((err) => {
                            console.log(err);
                        }).then((root: FolderRequest) => {

                            expect(root).to.not.eq(undefined);
                            root.Folder.then(folder => {
                                expect(folder.Href).to.be.a("string");
                                done();
                            });
                            
                        });

                    });

                    it('should test DocLauncherTask', function (done) {

                        svc.GetAllDocLauncherConfigs().then((configs) => {

                            svc.GetRootFolder().catch((err) => {
                                console.log(err);
                            }).then((root: FolderRequest) => {

                                
                                root.Folder.then(folder => {
                                    var dlt: DocLauncherTask = {};
                                    dlt.Data = "<Params><info>test</info></Params>";
                                    dlt.DataType = "XML";
                                    dlt.DestinationFolder = folder;
                                    dlt.DocLauncherConfiguration = configs.Items[0];
                                    svc.CreateDocLauncherTask(dlt).then((dl) => {

                                        expect(dl.Href).is.a("string");
                                        svc.GetDocLauncherTask(dl.Href).then((dlFromHref) => {
                                            expect(dlFromHref).is.equals(dl.Href);
                                            svc.GetDocLauncherTask(svc.getIDfromHref(dl.Href)).then(dlId => {
                                                expect(dlId).has.property("Href").equals(dl.Href);
                                                done();

                                            })

                                        })
                                        
                                    });
                                    
                                });

                            });



                        });

                        
                        //Assert.NotNull(dl.Href);
                        //svc.CreateDocLauncherTask().catch((err) => {
                        //	console.log(err);
                        //}).then((act: SpringCMItem<DocLauncherTask>) => {
                        //	asrt.notEqual(act, undefined);

                        
                        });

                   

                    it('should get the DocLauncherTask', function (done) {


                        //svc.GetDocLauncherTask().catch((err) => {
                        //	console.log(err);
                        //}).then((act: SpringCMItem<DocLauncherTask>) => {
                        //	asrt.notEqual(act, undefined);

                        done();
                        //});

                    });

                });
            });
            //return this.token;
        });

        return p;
    }
}
//var authToken = "23c5765e21be4c0986d7e4dd4a8454e7L4SNq60orgc2QTX3bReqQVvNLbJQts2Y0DIu10EEllevLE9y36xK1Pj0JEBPwk49nDBNKnCkMZFo09CHbVWx5shldSkwzzSA";
//var scm = new SpringCMService(authToken, "apiuatna11.springcm.com");
//describe('Array', function () {
//    describe('Folder Operations', function () {
//        it('should be able get a specific folder', function () {
//           //

//        scm.GetFolder("5644aa38-4e91-df11-9372-001cc448da6a").then((res:Folder) => {
//            console.log(res);
//            //expect(res).to.not.be.empty;
//            //expect(res).to.be.a("folder");
//            //expect(res.Href).to.not.be.undefined;
//        //    scm.GetDocumentsInFolder(res).then((res) => { console.log(res) });
//        //    scm.GetDocumentsInFolder("5644aa38-4e91-df11-9372-001cc448da6a").then((res) => { console.log(res) });
//        //    scm.GetFoldersInFolder(res).then((res) => { console.log(res) });
//        });
//           // assert.equal([1, 2, 3].indexOf(4), -1);
//        });
//        it('should be able get folders in a folder', function () {
//            //

//            scm.GetFolder("5644aa38-4e91-df11-9372-001cc448da6a").then((res: Folder) => {
//                console.log(res);
//                //expect(res).to.not.be.empty;
//                //expect(res).to.be.a("folder");
//                //expect(res.Href).to.not.be.undefined;
//                //    scm.GetDocumentsInFolder(res).then((res) => { console.log(res) });
//                //    scm.GetDocumentsInFolder("5644aa38-4e91-df11-9372-001cc448da6a").then((res) => { console.log(res) });
//                scm.GetFoldersInFolder(res).then((res) => { console.log(res) });
//            });
//            // assert.equal([1, 2, 3].indexOf(4), -1);
//        });
//        it('should be able get documents in a folder', function () {
//            //

//            scm.GetFolder("5644aa38-4e91-df11-9372-001cc448da6a").then((res: Folder) => {
//                console.log(res);
//                //expect(res).to.not.be.empty;
//                //expect(res).to.be.a("folder");
//                //expect(res.Href).to.not.be.undefined;
//                //    scm.GetDocumentsInFolder(res).then((res) => { console.log(res) });
//                //    scm.GetDocumentsInFolder("5644aa38-4e91-df11-9372-001cc448da6a").then((res) => { console.log(res) });
//                scm.GetFoldersInFolder(res).then((res) => { console.log(res) });
//            });
//            // assert.equal([1, 2, 3].indexOf(4), -1);
//        });
//        it('should be able get a folder by path', function () {
//            //
           
//            scm.GetFolderByPath("CastIronBeta/Invoices").then((res: Folder) => {
//                console.log(res);
//                //expect(res).to.not.be.empty;
//                //expect(res).to.be.a("folder");
//                //expect(res.Href).to.not.be.undefined;
//                //    scm.GetDocumentsInFolder(res).then((res) => { console.log(res) });
//                //    scm.GetDocumentsInFolder("5644aa38-4e91-df11-9372-001cc448da6a").then((res) => { console.log(res) });
//                //scm.GetFoldersInFolder(res).then((res) => { console.log(res) });
//            });
//            // assert.equal([1, 2, 3].indexOf(4), -1);
//        });


//        it('should be to get an id from a  path', function () {
//            //

//            var test = SpringCMService.parseIdFromUrl("https://apiuatna11.springcm.com/v201411/folders/1f65aade-d206-e811-9c10-3ca82a1e3f41")
//            console.log(test);
//            // assert.equal([1, 2, 3].indexOf(4), -1);
//        });
//    });
//});