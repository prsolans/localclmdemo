import * as req from "request-promise-native";
export class NodeHttpRequest {
    constructor(auth) {
        this.Get = (url, headers = undefined) => {
            var p = new Promise((res, rej) => {
                this.getHeader(headers).then((populatedHeaders) => {
                    //console.log(populatedHeaders);
                    req.get(url, { headers: populatedHeaders }).promise().then((myObj) => {
                        //console.log(myObj);
                        res(JSON.parse(myObj));
                    }, rej);
                }, rej);
            });
            return p;
        };
        this.Delete = (url, headers = undefined) => {
            var p = new Promise((res, rej) => {
                this.getHeader(headers).then((populatedHeaders) => {
                    req.delete(url, { headers: populatedHeaders }).promise().then((myObj) => {
                        res(JSON.parse(myObj));
                    }, rej);
                }, rej);
            });
            return p;
        };
        this.Patch = (url, body, headers = undefined) => {
            var p = new Promise((res, rej) => {
                this.getHeader(headers).then((populatedHeaders) => {
                    req.patch(url, { headers: populatedHeaders, body: JSON.stringify(body) }).promise().then((myObj) => {
                        res(JSON.parse(myObj));
                    }, rej);
                }, rej);
            });
            return p;
        };
        this.MakeCall = (url, body, headers, method) => {
            var p = new Promise((res, rej) => {
                this.getHeader(headers).then((populatedHeaders) => {
                    req.get(url, { headers: populatedHeaders, method: method }).promise().then((myObj) => {
                        res(JSON.parse(myObj));
                    }, rej);
                }, rej);
            });
            return p;
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
        this.Authenticator = auth;
    }
    Put(url, body, headers) {
        var p = new Promise((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                req.put(url, { headers: populatedHeaders, body: JSON.stringify(body) }).promise().then((myObj) => {
                    res(JSON.parse(myObj));
                }, rej);
            }, rej);
        });
        return p;
    }
    Post(url, body, headers) {
        var p = new Promise((res, rej) => {
            this.getHeader(headers).then((populatedHeaders) => {
                req.post(url, { headers: populatedHeaders, body: JSON.stringify(body) }).promise().then((myObj) => {
                    res(JSON.parse(myObj));
                }, rej);
            }, rej);
        });
        return p;
    }
}
//# sourceMappingURL=NodeHttpRequest.js.map