import { IHttpRequestor } from "./IHttpRequest";
import { BrowserHttpRequest } from "./BrowserHttpRequest";
//import { EformHttpRequest } from "./EformHttpRequest";
//import { NodeHttpRequest } from "./NodeHttpRequest";
import { IAuthenticator } from "../Authentication/IAuthentication";
declare var SpringCM: any;
export class RequestorFactory {
    
    public static GetRequestor = (auth: IAuthenticator): IHttpRequestor => {
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
    }


    }



