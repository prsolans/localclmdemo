import { SpringCMServiceBase } from "./SpringCMService";
import { RequestorFactory } from "./BrowserRequestFactory";
import { IAuthenticator } from "../Authentication/IAuthentication";
export { StaticTokenAuthenication } from '../Authentication/StaticTokenAuthentication'
export { FolderRequest } from '../Requests/FolderRequest';
export { DocumentSearch } from '../Model/DocumentSearch';
export { DocumentRequest } from '../Requests/DocumentRequest';
export class SpringCMService extends SpringCMServiceBase {


    public constructor(auth: IAuthenticator, datacenter: string) {
        super(auth, datacenter);
        this.Requestor = RequestorFactory.GetRequestor(auth);
        
    }
}