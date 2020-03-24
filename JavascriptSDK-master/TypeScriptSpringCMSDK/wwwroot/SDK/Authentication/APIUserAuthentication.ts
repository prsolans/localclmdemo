import { IAuthenticator} from './IAuthentication'
import { IHttpRequestor } from '../Service/IHttpRequest';
import { TokenRequest } from '../Model/Token';
import { RequestorFactory } from '../Service/RequestorFactory';


    export class APIUserAuthenticator implements IAuthenticator {
        
        public constructor(clientID: string, clientSecret: string, authUrl: string) {
            this._clientId = clientID;
            this._clientSecret = clientSecret;
            this._authUrl = authUrl;
        }

        private _clientId: string;

        private _clientSecret: string;

        private _authUrl: string;

        private _tokenRequest: TokenRequest;

        public  AccessToken = (): Promise<string>=> {

            var p = new Promise<string>((res, rej) => {
                if (((this._tokenRequest == null)
                    || (new Date() > this.TokenExpiration))) {
                    this.GetNewToken().then((token) => {  res(token.access_token) }).catch(rej);
                } else {

                    res(this._tokenRequest.access_token);
                }
            });
            return p;

        }

        public TokenExpiration: Date;

        public LastTokenRequest: Date
        public GetNewToken = (): Promise<TokenRequest> => {
            var body = {"client_id": this._clientId,"client_secret": this._clientSecret};
            //console.log(body);
            var p = new Promise<TokenRequest>((res, rej) => {
                let req: IHttpRequestor = RequestorFactory.GetRequestor(null);
                let resp = req.Post<TokenRequest>(this._authUrl, body, { "Authorization":""}).then(
                    (data: TokenRequest) => {
                        
                        this._tokenRequest = data;
                        this.LastTokenRequest = new Date();
                        res(this._tokenRequest);
                    }).catch(rej);


            })
            return p;
        }
    }
