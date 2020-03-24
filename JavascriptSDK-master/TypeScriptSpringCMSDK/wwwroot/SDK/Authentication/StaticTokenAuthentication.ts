import { IAuthenticator } from "./IAuthentication";

export class StaticTokenAuthenication implements IAuthenticator {


    constructor(token:string) {
        this._token = token;
    }

    private _token: string;
    AccessToken(): Promise<string> {
        var p = new Promise<string>((res, rej) => { res(this._token); })

        return p;

    }
    TokenExpiration: Date;
    LastTokenRequest: Date;




}