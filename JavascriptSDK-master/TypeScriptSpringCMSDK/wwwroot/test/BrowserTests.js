import { TestBase } from "./test.js";
import { StaticTokenAuthenication } from "../SDK/Authentication/StaticTokenAuthentication.js";
var auth = new StaticTokenAuthenication(authId);
var svc = new SpringSDK.SpringCMService(auth, "na11");
;
var test = new TestBase(svc, chai);
test.runTest();
//# sourceMappingURL=BrowserTests.js.map