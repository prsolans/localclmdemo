import { BrowserHttpRequest } from "./BrowserHttpRequest";
export class RequestorFactory {
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
        return new BrowserHttpRequest(auth);
        //}
        // return null;
    }
};
//# sourceMappingURL=BrowserRequestFactory.js.map