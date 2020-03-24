import { secrets } from "./secrets.js";
//import { expect } from 'chai'; 
import * as SpringCMSDK from "../../dist/SpringSDKNode.bundle.js";
import { TestBase } from "./test.js";
import * as chai from 'chai';
var opn = require('opn');
var auth = new SpringCMSDK.APIUserAuthenticator(secrets.springAuth.clientId, secrets.springAuth.clientSecret, "https://auth.springcm.com/api/v201606/apiuser");
var svc = new SpringCMSDK.SpringCMService(auth, "na11");
;
var test = new TestBase(svc, chai);
test.runTest().then(token => { opn("http://localhost:50547/testpage.html?id=" + token); });
//# sourceMappingURL=NodeTests.js.map