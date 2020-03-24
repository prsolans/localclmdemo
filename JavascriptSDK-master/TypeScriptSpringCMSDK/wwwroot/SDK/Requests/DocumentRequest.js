export class DocumentRequest {
    set ExpandAttributeGroups(value) {
        if ((this._expandAttributeGroups != value)) {
            this._id = this._scmsvc.getIDfromHref(this._document.Href);
            this._document = undefined;
            this._expandAttributeGroups = value;
        }
    }
    get ExpandAttributeGroups() {
        return this._expandAttributeGroups;
    }
    constructor(svc, documentId, documentPath, document) {
        this._id = documentId;
        this._scmsvc = svc;
        this._document = document;
        this._path = documentPath;
    }
    get Document() {
        var p = new Promise((res, rej) => {
            if ((this._document != undefined)) {
                this._id = this._scmsvc.getIDfromHref(this._document.Href);
                res(this._document);
                //return;
            }
            if (this._path != undefined) {
                this._scmsvc.Requestor.Get(`${this._scmsvc.GetObjectAPIUrl}/documents?path=${encodeURI(this._path)}&${this.ExpandDocument()}`).then((doc) => {
                    this._document = doc;
                    this._id = this._scmsvc.getIDfromHref(this._document.Href);
                    res(this._document);
                });
                //return _folder;
            }
            if ((this._id != undefined)) {
                this._scmsvc.Requestor.Get(`${this._scmsvc.GetObjectAPIUrl}/documents/${this._id}?${this.ExpandDocument()}`).then((doc) => {
                    this._document = doc;
                    //this.id = this._scmsvc.getIDfromHref(this._folder.Href);
                    res(this._document);
                });
            }
        });
        return p;
    }
    ExpandDocument() {
        let expandString = [];
        //if (this._expandParentFolder == true) {
        //    expandString.push("ParentFolder");
        //}
        //if (this._expandDocuments == true) {
        //    expandString.push("Documents");
        //}
        //if (this._expandFolders == true) {
        //    expandString.push("Folders");
        //}
        //if (this._expandPath) {
        //    expandString.push("Path");
        //}
        //if (this._expandEosParentInfo) {
        //    expandString.push("EosParentInfo");
        //}
        //if (this._expandEosInfo) {
        //    expandString.push("Eosinfo");
        //}
        //if (this._expandShareLinks) {
        //    expandString.push("ShareLinks");
        //}
        if (this._expandAttributeGroups == true) {
            expandString.push("AttributeGroups");
        }
        //if (this._expandSecurity) {
        //    expandString.push("Security");
        //}
        //if ((expandString.length == 0)) {
        //    return "";
        //}
        return `expand=${expandString.join(',')}`;
    }
    DownloadDocumentById(id, acceptType, page, headers) {
        var p = new Promise((res, rej) => {
            if (page != undefined) {
                this._scmsvc.Requestor.GetStream(`${this._scmsvc.GetDownloadAPIUrl}/documents/${id}?page=${page}`, acceptType).then(root => {
                    res(root);
                }).catch(rej);
            }
            else {
                this._scmsvc.Requestor.GetStream(`${this._scmsvc.GetDownloadAPIUrl}/documents/${id}`, acceptType).then(root => {
                    res(root);
                }).catch(rej);
            }
        });
        return p;
    }
    getID() {
        return this._id;
    }
}
//# sourceMappingURL=DocumentRequest.js.map