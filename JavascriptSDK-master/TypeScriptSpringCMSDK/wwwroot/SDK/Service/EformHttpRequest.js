//export class EformHttpRequest implements IHttpRequestor {
//    public Post<T>(url: string, body: any, headers: any): Promise<T> {
//        return new Promise((res, rej) => {
//            SpringCM.API.post(url, body, (data) => {
//                res(data)
//            }, (err) => {rej(err) });
//        });
//    }
//    public Get = <T>(url: string, headers: any = undefined): Promise<T> => {
//        return new Promise((res, rej) => {
//            SpringCM.API.get(url, (data) => {
//                res(data)
//            }, (err) => { rej(err) });
//        });
//    }
//    public Delete = <T>(url: string, headers: any = undefined): Promise<T> => {
//        return new Promise((res, rej) => {
//            SpringCM.API.del(url, (data) => {
//                res(data)
//            }, (err) => { rej(err) });
//        });
//    }
//    public Patch = <T>(url: string, body: any, headers: any = undefined): Promise<T> => {
//        return new Promise((res, rej) => {
//            SpringCM.API.patch(url, body, (data) => {
//                res(data)
//            }, (err) => { rej(err) });
//        });
//    }
//    public MakeCall = <T>(url: string, body: any, headers: any, method: string): Promise<T> => {
//        return new Promise((res, rej) => {
//            return $.ajax(url, { method: method, data: body, headers: headers }).done(res).fail(rej);
//        });
//    };
//}
//# sourceMappingURL=EformHttpRequest.js.map