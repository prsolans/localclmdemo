export class StaticTokenAuthenication {
    constructor(token) {
        this._token = token;
    }
    AccessToken() {
        var p = new Promise((res, rej) => { res(this._token); });
        return p;
    }
}
//# sourceMappingURL=StaticTokenAuthentication.js.map