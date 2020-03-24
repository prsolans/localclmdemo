import { SpringCMServiceBase } from "./SpringCMService";
import { RequestorFactory } from "./RequestorFactory";
import { IAuthenticator } from "../Authentication/IAuthentication";
export { APIUserAuthenticator } from "../Authentication/APIUserAuthentication"


export class SpringCMService extends SpringCMServiceBase {


    public constructor(auth: IAuthenticator, datacenter: string) {
        super(auth, datacenter);
        this.Requestor = RequestorFactory.GetRequestor(auth);
        
    }
}