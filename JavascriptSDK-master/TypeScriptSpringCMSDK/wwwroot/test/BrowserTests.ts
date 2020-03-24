//import { secrets } from "./secrets.js"
//import { expect } from 'chai'; 
declare var SpringSDK;
import { TestBase } from "./test.js";
import { StaticTokenAuthenication } from "../SDK/Authentication/StaticTokenAuthentication.js";
declare var authId;
var auth = new StaticTokenAuthenication(authId);
declare var chai;
var svc = new SpringSDK.SpringCMService(auth, "na11");;
var test: TestBase = new TestBase(svc,chai);
test.runTest()
