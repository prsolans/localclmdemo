import { RequestorFactory } from '../Service/RequestorFactory';
export class APIUserAuthenticator {
    constructor(clientID, clientSecret, authUrl) {
        this.AccessToken = () => {
            var p = new Promise((res, rej) => {
                if (((this._tokenRequest == null)
                    || (new Date() > this.TokenExpiration))) {
                    this.GetNewToken().then((token) => { res(token.access_token); }).catch(rej);
                }
                else {
                    res(this._tokenRequest.access_token);
                }
            });
            return p;
        };
        this.GetNewToken = () => {
            var body = { "client_id": this._clientId, "client_secret": this._clientSecret };
            //console.log(body);
            var p = new Promise((res, rej) => {
                let req = RequestorFactory.GetRequestor(null);
                let resp = req.Post(this._authUrl, body, { "Authorization": "" }).then((data) => {
                    this._tokenRequest = data;
                    this.LastTokenRequest = new Date();
                    res(this._tokenRequest);
                }).catch(rej);
            });
            return p;
        };
        this._clientId = clientID;
        this._clientSecret = clientSecret;
        this._authUrl = authUrl;
    }
}
//# sourceMappingURL=APIUserAuthentication.js.map