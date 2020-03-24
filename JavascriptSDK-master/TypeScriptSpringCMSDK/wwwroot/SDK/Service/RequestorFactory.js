//import { EformHttpRequest } from "./EformHttpRequest";
import { NodeHttpRequest } from "./NodeHttpRequest";
export class RequestorFactory {
}
RequestorFactory.GetRequestor = (auth) => {
    // if (typeof window === 'undefined') {
    return new NodeHttpRequest(auth);
    //}
    //else {
    //    if (SpringCM.API != undefined) {
    //        //return new EformHttpRequest();
    //    }
    //    else {
    //       return new BrowserHttpRequest(auth);
    //    }
    //    return null;
    //}
};
//# sourceMappingURL=RequestorFactory.js.map