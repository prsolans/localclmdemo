import { SpringCMServiceBase } from "../Service/SpringCMService";
import { Document } from "../Model/Document";
import { AttributeGroups } from "../Model/AttributeGroup";

export class DocumentRequest {

    private _id: string;

    private _path: string;

    private _scmsvc: SpringCMServiceBase;

    private _document: Document;

    private _attributes: AttributeGroups;

    private _expandAttributeGroups: boolean;


    set ExpandAttributeGroups(value: boolean) {
        if ((this._expandAttributeGroups != value)) {
            this._id = this._scmsvc.getIDfromHref(this._document.Href);
            this._document = undefined;
            this._expandAttributeGroups = value;
        }
    }
    get ExpandAttributeGroups(): boolean {

        return this._expandAttributeGroups;
    }

    public constructor(svc: SpringCMServiceBase,documentId: string,documentPath:string, document:Document) {
        this._id = documentId;
        this._scmsvc = svc;
        this._document = document;
        this._path = documentPath;

    }

    public get Document(): Promise<Document> {
        var p = new Promise<Document>((res, rej) => {
            if ((this._document != undefined)) {
                this._id = this._scmsvc.getIDfromHref(this._document.Href);
                res(this._document);
                //return;
            }
            if (this._path != undefined) {
                this._scmsvc.Requestor.Get<Document>(`${this._scmsvc.GetObjectAPIUrl}/documents?path=${encodeURI(this._path)}&${this.ExpandDocument()}`).then((doc) => {
                    this._document = doc;
                    this._id = this._scmsvc.getIDfromHref(this._document.Href);
                    res(this._document);
                });
                //return _folder;
            }
            if ((this._id != undefined)) {
                this._scmsvc.Requestor.Get<Document>(`${this._scmsvc.GetObjectAPIUrl}/documents/${this._id}?${this.ExpandDocument()}`).then((doc) => {
                    this._document = doc;
                    //this.id = this._scmsvc.getIDfromHref(this._folder.Href);
                    res(this._document);
                })

            }


        });

        return p;
    }

    private ExpandDocument(): String {
        let expandString: Array<String> = [];
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

    public DownloadDocumentById(id: string, acceptType: string, page?: string, headers?: string): Promise<Blob> {

        var p = new Promise<Blob>((res, rej) => {
            if (page != undefined) {
                this._scmsvc.Requestor.GetStream<Blob>(`${this._scmsvc.GetDownloadAPIUrl}/documents/${id}?page=${page}`, acceptType).then(root => {
                    res(root);
                }).catch(rej);
            } else {
                this._scmsvc.Requestor.GetStream<Blob>(`${this._scmsvc.GetDownloadAPIUrl}/documents/${id}`, acceptType).then(root => {
                    res(root);
                }).catch(rej);
            }
        })
        return p;
    }
    
    public getID(): string {
        return this._id;
    }

   
    //public Result(): Document {
    //    if ((this._document != null)) {
    //        return this._document;
    //    }

    //    if (this._path == undefined) {
    //        this._document = this._scmsvc.requestor.Get<Document>("{_scmsvc.GetObjectAPIUrl}/documents?path={System.Web.HttpUtility.UrlEncode(_path)}", new Dictionary<string, string>());
    //    }

    //    if ((this._id != null)) {
    //        this._document = this._scmsvc.requestor.Get<Document>("{_scmsvc.GetObjectAPIUrl}/documents/{_id}", new Dictionary<string, string>());
    //    }

    //    return this._document;
    //}
}