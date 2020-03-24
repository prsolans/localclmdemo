export class BrowserHttpRequest {
    constructor(auth) {
        this.Get = (url, headers = undefined) => {
            return new Promise((res, rej) => {
                this.getHeader(headers).then((populatedHeaders) => {
                    $.ajax(url, { method: "GET", data: undefined, headers: populatedHeaders }).done(data => { res(data); }).fail(rej);
                }, rej);
            });
        };
        this.Delete = (url, headers = undefined) => {
            return new Promise((res, rej) => {
                this.getHeader(headers).then((populatedHeaders) => {
                    $.ajax(url, { method: "DELETE", data: undefined, headers: populatedHeaders }).done(data => { res(data); }).fail(rej);
                }, rej);
            });
        };
        this.Patch = (url, body, headers = undefined) => {
            return new Promise((res, rej) => {
                this.getHeader(headers).then((populatedHeaders) => {
                    $.ajax(url, { method: "PATCH", data: JSON.stringify(body), headers: populatedHeaders }).done(data => { res(data); }).fail(rej);
                }, rej);
            });
        };
        this.MakeCall = (url, body, headers, method) => {
            return new Promise((res, rej) => {
                this.getHeader(headers).then((populatedHeaders) => {
                    $.ajax(url, { method: method, data: JSON.stringify(body), headers: populatedHeaders }).done(data => { res(data); }).fail(rej);
                }, rej);
            });
        };
        this.GetStream = (url, acceptType, headers = undefined) => {
            return new Promise((res, rej) => {
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
                        }
                        else {
                            res(responseText);
                        }
                    };
                    req.send();
                }, rej);
            });
        };
        this.getHeader = (currentHeader) => {
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
            var p = new Promise((res, rej) => {
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
            });
            return p;
        };
        this.getAuthHeader = (authToken) => {
            var p = new Promise((res, rej) => {
                if (authToken == undefined) {
                    this.Authenticator.AccessToken().then((token) => {
                        authToken = `bearer ${token}`;
                        res(authToken);
                    }, rej);
                }
                else {
                    //  console.log("Authorization is already set");
                    res(authToken);
                }
            });
            return p;
        };
        this.Authenticator = auth;
    }
    Put(url, body, headers) {
        return new Promise((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                $.ajax(url, { method: "PUT", data: JSON.stringify(body), headers: populatedHeaders }).done(data => { res(data); }).fail(rej);
            }, rej);
        });
    }
    Post(url, body, headers) {
        return new Promise((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                $.ajax(url, { method: "POST", data: JSON.stringify(body), headers: populatedHeaders }).done(data => { res(data); }).fail(rej);
            }, rej);
        });
    }
}
//# sourceMappingURL=BrowserHttpRequest.js.map