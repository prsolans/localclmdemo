import { IHttpRequestor } from "./IHttpRequest";
import * as req from "request-promise-native"
import { IAuthenticator } from "../Authentication/IAuthentication";



export class NodeHttpRequest implements IHttpRequestor {
    
  

    constructor(auth: IAuthenticator) {
        this.Authenticator = auth;
    }
    public Authenticator: IAuthenticator;

    
    public Put<T>(url: string, body: any, headers?: any): Promise<T>  {
        var p = new Promise<T>((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                req.put(url, { headers: populatedHeaders, body: JSON.stringify(body) }).promise().then((myObj) => {
                    res(JSON.parse(myObj));
                },rej);
            }, rej)
            
        })
        return p;
    }

    public Post<T>(url: string, body: any, headers?: any): Promise<T> {
        var p = new Promise<T>((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                req.post(url, { headers: populatedHeaders, body: JSON.stringify(body) }).promise().then((myObj) => {
                    res(JSON.parse(myObj));
                }, rej);
            }, rej)

        })
        return p;
    }

    public Get = <T>(url: string, headers: any = undefined): Promise<T> => {
        var p = new Promise<T>((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                //console.log(populatedHeaders);
                req.get(url, { headers: populatedHeaders }).promise().then((myObj) => {
                    //console.log(myObj);
                    res(JSON.parse(myObj));
                }, rej);
            }, rej)

        })
        return p;
       
        
    }
    public Delete = <T>(url: string, headers: any = undefined): Promise<T> => {

        var p = new Promise<T>((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                req.delete(url, { headers: populatedHeaders }).promise().then((myObj) => {
                    res(JSON.parse(myObj));
                }, rej);
            }, rej)

        })
        return p;
        
        
    }
    public Patch = <T>(url: string, body: any, headers: any = undefined): Promise<T> => {
        var p = new Promise<T>((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                req.patch(url, { headers: populatedHeaders, body: JSON.stringify(body) }).promise().then((myObj) => {
                    res(JSON.parse(myObj));
                }, rej);
            }, rej)

        })
        return p;
        
        
    }
    public MakeCall = <T>(url: string, body: any, headers: any, method: string): Promise<T>=> {

        var p = new Promise<T>((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                req.get(url, { headers: populatedHeaders, method: method }).promise().then((myObj) => {
                    res(JSON.parse(myObj));
                }, rej);
            }, rej)

        })
        return p;
        
        
    };
    public getHeader = (currentHeader:any[]):Promise<any[]> => {

        if (currentHeader == undefined) {
            currentHeader = [];
        }

        if (currentHeader["accept"] == undefined) {
            currentHeader["accept"] = "application/json";
        }
        if (currentHeader["Content-Type"] == undefined) {
            currentHeader["Content-Type"] = "application/json";
        }
        //console.log(currentHeader);
        var p = new Promise<any[]>((res, rej) => {
           
            if (currentHeader["Authorization"] == undefined) {
               // console.log("Authorization is not already set");
                this.Authenticator.AccessToken().then((token) => {

                    currentHeader["Authorization"] = `bearer ${token}`;
                    res(currentHeader);
                },rej);
            }
            else {
            //  console.log("Authorization is already set");
                res(currentHeader);
            }
        })
        return p;
        
    }
}