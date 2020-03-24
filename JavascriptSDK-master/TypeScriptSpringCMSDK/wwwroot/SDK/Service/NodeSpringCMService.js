import { SpringCMServiceBase } from "./SpringCMService";
import { RequestorFactory } from "./RequestorFactory";
export { APIUserAuthenticator } from "../Authentication/APIUserAuthentication";
export class SpringCMService extends SpringCMServiceBase {
    constructor(auth, datacenter) {
        super(auth, datacenter);
        this.Requestor = RequestorFactory.GetRequestor(auth);
    }
}
//# sourceMappingURL=NodeSpringCMService.js.map