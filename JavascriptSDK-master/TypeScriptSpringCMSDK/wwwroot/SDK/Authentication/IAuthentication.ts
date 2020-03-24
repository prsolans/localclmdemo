//export module SpringCMSDK.Authentication {

    export interface IAuthenticator {

        AccessToken():Promise<string>;

        TokenExpiration: Date ;

        LastTokenRequest: Date ;
    }
//}