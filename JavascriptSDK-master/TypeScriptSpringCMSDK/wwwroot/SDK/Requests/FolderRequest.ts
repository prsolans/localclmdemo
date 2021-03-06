﻿import { SpringCMServiceBase } from "../Service/SpringCMService";
import { Folder } from "../Model/Folder";
import { SpringCMItem } from "../Model/SpringCMItem";

export class FolderRequest {

    private _id: string;

    private _path: string;

    private _scmsvc: SpringCMServiceBase;

    private _folder: Folder;

    private _expandParentFolder: boolean;

    private _expandDocuments: boolean;

    private _expandFolders: boolean;

    private _expandPath: boolean;

    private _expandEosParentInfo: boolean;

    private _expandEosInfo: boolean;

    private _expandShareLinks: boolean;

    private _expandAttributeGroups: boolean;

    private _expandSecurity: boolean;



    set ExpandDocuments(value: boolean) {
        if ((this._expandDocuments != value)) {
            this._id = this._scmsvc.getIDfromHref(this._folder.Href);
            this._folder = undefined;
            this._expandDocuments = value;
        }
    }
    get ExpandDocuments(): boolean {

        return this._expandDocuments;
    }

    set ExpandFolders(value: boolean) {
        if ((this._expandFolders != value)) {
            this._id = this._scmsvc.getIDfromHref(this._folder.Href);
            this._folder = undefined;
            this._expandFolders = value;
        }
    }
    get ExpandFolders(): boolean {

        return this._expandFolders
    }
    set ExpandPath(value: boolean) {
        if ((this._expandPath != value)) {
            this._folder = undefined;
        }
    }
    get ExpandPath(): boolean {

        return this._expandPath;
    }
    set ExpandEosParentInfo(value: boolean) {
        if ((this._expandEosParentInfo != value)) {
            this._folder = undefined;
        }
    }
    get ExpandEosParentInfo(): boolean {

        return this._expandEosParentInfo;
    }
    set ExpandEosInfo(value: boolean) {
        if ((this._expandEosInfo != value)) {
            this._folder = undefined;
        }
    }
    get ExpandEosInfo(): boolean {

        return this._expandEosInfo;
    }
    set ExpandShareLinks(value: boolean) {
        if ((this._expandShareLinks != value)) {
            this._folder = undefined;
        }
    }
    get ExpandShareLinks(): boolean {

        return this._expandShareLinks;
    }
    set ExpandAttributeGroups(value: boolean) {
        if ((this._expandAttributeGroups != value)) {
            this._id = this._scmsvc.getIDfromHref(this._folder.Href);
            this._folder = undefined;
            this._expandAttributeGroups = value;
        }
    }
    get ExpandAttributeGroups(): boolean {

        return this._expandAttributeGroups;
    }
    set ExpandSecurity(value: boolean) {
        if ((this._expandSecurity != value)) {
            this._folder = undefined;
        }
    }
    get ExpandSecurity(): boolean {

        return this._expandSecurity;
    }
    constructor(svc: SpringCMServiceBase, folderId: string, path: string, folder: Folder) {
        this._id = folderId;
        this._scmsvc = svc;
        this._folder = folder;
        this._path = path;
    }

    public get Folder(): Promise<Folder> {
        var p = new Promise<Folder>((res, rej) => {
            if ((this._folder != undefined)) {
                this._id = this._scmsvc.getIDfromHref(this._folder.Href);
                res(this._folder);
                //return;
            }
            if (this._path != undefined) {
                this._scmsvc.Requestor.Get<Folder>(`${this._scmsvc.GetObjectAPIUrl}/folders?path=${encodeURI(this._path)}&${this.ExpandFolder()}`).then((fol) => {
                    this._folder = fol;
                    this._id = this._scmsvc.getIDfromHref(this._folder.Href);
                    res(this._folder);
                });
                //return _folder;
            }
            if ((this._id != undefined)) {
                this._scmsvc.Requestor.Get<Folder>(`${this._scmsvc.GetObjectAPIUrl}/folders/${this._id}?${this.ExpandFolder()}`).then((fol) => {

                    this._folder = fol;
                    //this.id = this._scmsvc.getIDfromHref(this._folder.Href);
                    res(this._folder);
                })

            }


        });



        return p;
    }

    //public GetAllSubfolders(): Promise<Array<FolderRequest>> {

    //    var p = new Promise<Array<FolderRequest>>((res, rej) => {

    //        this.Folder.then((folder) => {
    //            let res = this._scmsvc.Requestor.Get<SpringCMItem<Folder>>(`${folder.Href}/folders?limit=${this._scmsvc.DefaultQueryBatch}`).then((folders) => {

    //                var frs:Array<FolderRequest> = [];
    //                for (var i = 0; i < folders.Items.length;i++) {
    //                    frs.push(new FolderRequest(this._scmsvc, undefined, undefined, folders.Items[i]));
    //                }

    //                if ((folders.Items.length < folders.Total)) {
    //                    while ((folders.Next != undefined)) {
    //                        folders = this._scmsvc.Requestor.Get<SpringCMItem<Folder>>(`${folders.Next}`);
    //                        lst.AddRange(res.Items.Select(() => { }, new FolderRequest(a, _scmsvc)));
    //                    }

    //                }

    //                return lst;

    //            })



    //        })


    //    })

    //}

    //public UploadDocument(file: System.IO.Stream, FileName: string): Task < DocumentRequest > {
    //                                    return this._scmsvc.UploadDocument(this.Folder, file, FileName);
    //                                }

    //public Delete(): Task < Folder > {
    //                                    return this._scmsvc.DeleteFolder(this.Folder);
    //                                }

    //public CreateSubfolder(name: string): Task < FolderRequest > {
    //                                    let fol = [][
    //                                        Name = name,
    //                                        ParentFolder = this.Folder];
    //                                    return _scmsvc.CreateFolder(fol);
    //                                }

    //public GetAllDocuments(): Task < List < DocumentRequest >> {
    //                                    let res = ((this._scmsvc.requestor.Get
    //                                        < (SpringCMItem < Document))
    //                                        + "{Folder.Href}/documents?limit={_scmsvc.DefaultQueryBatch}&{ExpandFolder()}");
    //                                    let lst = res.Items.Select(() => { }, new DocumentRequest(a, _scmsvc)).ToList();
    //                                    if((res.Items.Count < res.Total)) {
    //                                    while ((res.Next != null)) {
    //                                        res = ((this._scmsvc.requestor.Get
    //                                            < (SpringCMItem < Document))
    //                                            + "{res.Next}");
    //                                        lst.AddRange(res.Items.Select(() => { }, new DocumentRequest(a, _scmsvc)));
    //                                    }

    //                                }

    //                                return lst;
    //                            }

    private ExpandFolder(): String {
        let expandString: Array<String> = [];
        if (this._expandParentFolder == true) {
            expandString.push("ParentFolder");
        }

        if (this._expandDocuments == true) {
            expandString.push("Documents");
        }

        if (this._expandFolders == true) {
            expandString.push("Folders");
        }

        if (this._expandPath) {
            expandString.push("Path");
        }

        if (this._expandEosParentInfo) {
            expandString.push("EosParentInfo");
        }

        if (this._expandEosInfo) {
            expandString.push("Eosinfo");
        }

        if (this._expandShareLinks) {
            expandString.push("ShareLinks");
        }

        if (this._expandAttributeGroups == true) {
            expandString.push("AttributeGroups");
        }

        if (this._expandSecurity) {
            expandString.push("Security");
        }

        if ((expandString.length == 0)) {
            return "";
        }

        return `expand=${expandString.join(',')}`;

    }
}