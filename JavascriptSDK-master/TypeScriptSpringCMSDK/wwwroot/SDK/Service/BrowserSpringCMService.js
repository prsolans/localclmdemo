import { SpringCMServiceBase } from "./SpringCMService";
import { RequestorFactory } from "./BrowserRequestFactory";
export { StaticTokenAuthenication } from '../Authentication/StaticTokenAuthentication';
export { FolderRequest } from '../Requests/FolderRequest';
export { DocumentRequest } from '../Requests/DocumentRequest';
export class SpringCMService extends SpringCMServiceBase {
    constructor(auth, datacenter) {
        super(auth, datacenter);
        this.Requestor = RequestorFactory.GetRequestor(auth);
    }
}
//# sourceMappingURL=BrowserSpringCMService.js.map