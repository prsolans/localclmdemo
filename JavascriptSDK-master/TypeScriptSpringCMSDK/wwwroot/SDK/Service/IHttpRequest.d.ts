import { IAuthenticator } from "../Authentication/IAuthentication";

export interface IHttpRequestor{

    //constructor(auth: IAuthenticator)
    Post<T>(url: string, body: any, headers?: any):Promise<T> ;
    Get<T>(url: string, headers?: any, ): Promise<T>;
    Delete<T>(url: string, headers?: any): Promise<T>;
    Patch<T>(url: string, body: any, headers?: any): Promise<T>;
    Put<T>(url: string, body: any, headers?: any): Promise<T>;
    MakeCall<T>(url: string, body: any, headers?: any, method?: string): Promise<T>;
    GetStream<T>(url: string, headers?: any, ): Promise<T>;
    PostFile<T>(url: string, body: any, fileName: string, headers?: any): Promise<T>;
    Authenticator: IAuthenticator;

}