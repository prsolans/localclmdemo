import { IHttpRequestor } from "./IHttpRequest";
import { IAuthenticator } from "../Authentication/IAuthentication";



export class BrowserHttpRequest implements IHttpRequestor {

    constructor(auth: IAuthenticator) {
        this.Authenticator = auth;
    }
    public Authenticator: IAuthenticator;



    public Put<T>(url: string, body: any, headers?: any): Promise<T> {



        return new Promise<T>((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                $.ajax(url, { method: "PUT", data: JSON.stringify(body), headers: populatedHeaders }).done(data => { res(data); }).fail(rej);
               
            }, rej)

            
        });
    }
    

    
    public  Post<T>(url: string, body: any, headers: any): Promise<T>  {

        return new Promise<T>((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                $.ajax(url, { method: "POST", data: JSON.stringify( body), headers: populatedHeaders }).done(data => { res(data); }).fail(rej);

            }, rej)


        });
    }

    public Get= <T>(url: string, headers: any = undefined): Promise<T> => {
        return new Promise<T>((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                $.ajax(url, { method: "GET", data: undefined, headers: populatedHeaders }).done(data => {  res(data); }).fail(rej);

            }, rej)


        });
    }
    public Delete = <T>(url: string, headers: any = undefined): Promise<T> => {
        return new Promise<T>((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                $.ajax(url, { method: "DELETE", data: undefined, headers: populatedHeaders }).done(data => { res(data); }).fail(rej);

            }, rej)


        });
    }
    public Patch = <T>(url: string, body: any, headers: any = undefined): Promise<T> => {
        return new Promise<T>((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                $.ajax(url, { method: "PATCH",data: JSON.stringify(body), headers: populatedHeaders }).done(data => { res(data); }).fail(rej);

            }, rej)


        });
    }
    public MakeCall = <T>(url: string, body: any, headers: any, method: string): Promise<T>=> {
        return new Promise<T>((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                $.ajax(url, { method: method, data: JSON.stringify(body), headers: populatedHeaders }).done(data => { res(data); }).fail(rej);

            }, rej)


        });
    };

    public GetStream = <T>(url: string,acceptType:string, headers: any = undefined): Promise<T> => {
        return new Promise<T>((res, rej) => {
            this.getAuthHeader(headers).then((authBearer) => {
                
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.responseType = "arraybuffer";
                req.setRequestHeader("Accept", acceptType);
                req.setRequestHeader("Authorization", authBearer);
                req.onload = function (event) {
                    var responseText = req.response;
                    if (req.status == 404) {
                        res();
                    } else {
                        res(responseText);
                    }
                    
                };
                req.send();
            }, rej)
        });
    }

    public getHeader = (currentHeader: any): Promise<any> => {

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
                }, rej);
            }
            else {
                //  console.log("Authorization is already set");
                res(currentHeader);
            }
        })
        return p;

    }

    public getAuthHeader = (authToken: any): Promise<any> => {

        var p = new Promise<any[]>((res, rej) => {
            if (authToken == undefined) {
                this.Authenticator.AccessToken().then((token) => {

                    authToken = `bearer ${token}`;
                    res(authToken);
                }, rej);
            } else {
                //  console.log("Authorization is already set");
                res(authToken);
            }

        })
        return p;

    }
}