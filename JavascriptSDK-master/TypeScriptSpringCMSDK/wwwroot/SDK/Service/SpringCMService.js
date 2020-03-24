import { Validator } from "./validator";
import { FolderRequest } from "../Requests/FolderRequest";
import { DocumentRequest } from "../Requests/DocumentRequest";
export class SpringCMServiceBase {
    constructor(auth, datacenter) {
        this.ApplicationVersion = "v201411";
        this.Datacenter = datacenter;
        this.GetObjectAPIUrl = `https://api${this.Datacenter}.springcm.com/${this.ApplicationVersion}`;
        this.GetUploadAPIUrl = `https://apiupload${this.Datacenter}.springcm.com/${this.ApplicationVersion}`;
        this.GetDownloadAPIUrl = `https://apidownload${this.Datacenter}.springcm.com/${this.ApplicationVersion}`;
    }
    GetCurrentAccount() {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/accounts/current`);
    }
    UpdateAccount(act) {
        return this.Requestor.Patch(act.Href, act);
    }
    GetCurrentAccountAttributeGroups() {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/accounts/current/attributegroups`);
    }
    //public QueryNext(springCMItem: SpringCMItem<T>): Promise<SpringCMItem<T>> {
    //    return this.Requestor.Get<SpringCMItem<T>>(`${this.springCMItem.Next}`);
    //}
    GetAllDocLauncherConfigs() {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/doclauncherconfigurations`);
    }
    GetAllPermissionSets() {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/permissionsets`);
    }
    GetDocLauncherTask(IdorHref) {
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/doclauncherTasks/${IdorHref}`;
        }
        return this.Requestor.Get(href);
    }
    CreateDocLauncherTask(DocLauncherTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/DocLauncherTasks`, DocLauncherTask);
    }
    GetAllContacts() {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/contacts`);
    }
    GetContactById(Id) {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/contacts/{Id}`);
    }
    CreateContact(contact) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/contacts/`, contact);
    }
    UpdateContact(contact) {
        return this.Requestor.Put(contact.Href, contact);
    }
    DeleteContact(contact) {
        return this.Requestor.Delete(contact.Href);
    }
    GetWorkflow(IdorHref) {
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workflows/${IdorHref}`;
        }
        return this.Requestor.Get(href);
    }
    StartWorkflow(workflow) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/workflows/`, (workflow));
    }
    SignalWorkflow(workflow, data) {
        return this.Requestor.Post(`${workflow.Href}/signal`, `{"data":"${data}" }`);
    }
    DeleteWorkflow(workflow) {
        return this.Requestor.Delete(workflow.Href);
    }
    GetWorkflowQueue(IdorHref) {
        //         let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workflowqueues/${IdorHref}`;
        }
        return;
    }
    GetWorkflowQueueWorkItems(IdorHref) {
        //         let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workflowqueues/${IdorHref}/workitems`;
        }
        return;
    }
    GetWorkItem(IdorHref, assignee = false, documents = false, assigneeInstructions = false, workflow = false, selections = false) {
        //        let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workitems/${IdorHref}`;
        }
        let expandString = [];
        if (assignee) {
            expandString.push("Assignee");
        }
        if (documents) {
            expandString.push("Documents");
        }
        if (assigneeInstructions) {
            expandString.push("AssigneeInstructions");
        }
        if (workflow) {
            expandString.push("Workflow");
        }
        if (selections) {
            expandString.push("Selections");
        }
        if ((expandString.length == 0)) {
            return this.Requestor.Get(href);
        }
        let expand = `expand=${expandString.join(',')}`;
        return this.Requestor.Get(`${href}?expand=${expand}`);
    }
    ;
    //        ///  <summary>
    //        ///  Method accepts an ID or an HREF
    //        ///  Brings back documents assigned to a user via SpringCM Promise
    //        ///  </summary>
    //        ///  <param name="IdorHref"></param>
    //        ///  <returns>Returns a list of documents associated to the Promises assigned to a user</returns>
    GetWorkItemDocuments(IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workitems/{IdorHref}/documents`;
        }
        return this.Requestor.Get(href);
    }
    //        ///  <summary>
    //        ///   Method accepts an ID or an HREF
    //        ///   Currently this method does not work but may in the future.
    //        ///  </summary>
    //        ///  <param name="workitem"></param>
    //        ///  <param name="IdorHref"></param>
    //        ///  <returns></returns>
    UpdateWorkitem(workitem, IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workitems/{IdorHref}`;
        }
        return this.Requestor.Patch("{href}", (workitem));
    }
    GetDocumentReminder(IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/DocumentReminders/{id}`;
        }
        return this.Requestor.Get((href + "?expand=Documents,RecipientUsers,RecipientGroups"));
    }
    CreateDocumentReminder(documentReminder) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/DocumentReminders/`, (documentReminder));
    }
    UpdateDocumentReminder(documentReminder) {
        return this.Requestor.Put(documentReminder.Href, (documentReminder));
    }
    DeleteDocumentReminder(documentReminder) {
        return this.Requestor.Delete(documentReminder.Href);
    }
    //        public GetGroup(IdorHref: string, loadGroupMembers: boolean = false): Promise<Group> {
    //    let id: Guid;
    //    let href = IdorHref;
    //    let expand = "";
    //    if(loadGroupMembers) {
    //        expand = "?expand=GroupMembers";
    //    }
    //            if(Guid.TryParse(IdorHref, /* out */id)) {
    //    href = "{GetObjectAPIUrl}/Groups/{IdorHref}{expand}";
    //}
    //return this.Requestor.Get<Group>(href);
    //        }
    GetGroupMembers(IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/Groups/{IdorHref}`;
        }
        return this.Requestor.Get("{href}/groupmembers");
    }
    CreateGroup(group) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/groups/`, (group));
    }
    UpdateGroup(group, overwriteMembers = false) {
        if (overwriteMembers) {
            return this.Requestor.Put("{group.Href}", (group));
        }
        return this.Requestor.Patch("{group.Href}", (group));
    }
    DeleteGroup(group) {
        return this.Requestor.Delete(group.Href);
    }
    //public GetCurrentUser(): Promise<UserRequest> {
    //    return new UserRequest(this.Requestor.Get<User>(`${this.GetObjectAPIUrl}/Users/Current`), this);
    //}
    //public GetAllUsers(): Promise<List<UserRequest>> {
    //    let users = this.Requestor.Get<List<User>>(`${this.GetObjectAPIUrl}/Users/`);
    //    return users.Select(() => { }, new UserRequest(a, this)).ToList();
    //}
    //public CreateUser(user: UserRequest): Promise<UserRequest> {
    //    return this.CreateUser(user.User);
    //}
    //public CreateUser(user: User): Promise<UserRequest> {
    //    return new UserRequest(this.Requestor.Post<User>(`${this.GetObjectAPIUrl}/users/`, (user)), this);
    //}
    //public DeleteUser(user: UserRequest): Promise<User> {
    //    return this.DeleteUser(user.User);
    //}
    //public DeleteUser(user: User): Promise<User> {
    //    return this.Requestor.Delete<User>(user.Href);
    //}
    //public GetUser(IdorHref: string): Promise<UserRequest> {
    //    //			let id: Guid;
    //    let href = IdorHref;
    //    if (Validator.isUUID(IdorHref)) {
    //        href = `${this.GetObjectAPIUrl}/users/{IdorHref}`;
    //    }
    //    return new UserRequest(this.Requestor.Get<User>(href), this);
    //}
    //public UpdateUser(user: UserRequest, overwriteGroups: boolean = false): Promise<UserRequest> {
    //    return this.UpdateUser(user.User, overwriteGroups);
    //}
    //public UpdateUser(user: User, overwriteGroups: boolean = false): Promise<UserRequest> {
    //    if (overwriteGroups) {
    //        return new UserRequest(this.Requestor.Put<User>("{user.Href}", (user)), this);
    //    }
    //    return new UserRequest(this.Requestor.Patch<User>("{user.Href}", (user)), this);
    //}
    GetCurrentUsersWatchedDocuments() {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/users/current/watcheddocuments`);
    }
    GetCurrentUsersWatchedDocumentsProcessTractingActivites() {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/users/current/watcheddocumentsprocesstrackingactivities`);
    }
    GetCurrentUsersWorkItems(IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/users/{IdorHref}/workitems`;
        }
        return this.Requestor.Get(href);
    }
    //public UploadDocument(folder: Folder, file: Stream, fileName: string): Promise<DocumentRequest> {
    //    return new DocumentRequest(this.Requestor.PostFile(`${this.GetUploadAPIUrl}/folders/{getIDfromHref(folder.Href)}/documents`, file, fileName), this);
    //}
    //public MakeSafeFolderName(folderName: string): string {
    //    // return folderName.replace(/[.\?]/g,'')
    //    // return folderName.replace(/.|\|?/g,'')
    //    return folderName.replace(".", "_").replace("\", "_").replace(" / ", "_").replace(": ", "_").replace(" * ", "_").replace(" ? ", "_").replace(""""", ", _, (").replace(" < ", "), _, (").replace(" > ", "), _, "".replace(" | ", "_"));
    //        }
    //public MakeSafePathName(folderName: string): string {
    //    return folderName.replace(".", "_").replace(":", "_").replace("*", "_").replace("?", "_").replace(""""", ", _, (").replace(" < ", "), _, (").replace(" > ", "), _, "".replace("|", "_"));
    //}
    //public CheckInDocument(id: string, file: Stream, fileName: string): Promise<DocumentRequest> {
    //    return new DocumentRequest(this.Requestor.PostFile(`${this.GetUploadAPIUrl}/documents/{id}`, file, fileName), this);
    //}
    //        public FindOrCreateFolder(path: string): Promise<FolderRequest> {
    //    try {
    //        let fldrreq = this.GetFolderByPath(this.MakeSafePathName(path));
    //        let fldr = fldrreq.Folder;
    //        return fldrreq;
    //    }
    //            catch(ag /*:AggregateException*/) {
    //        let ae = (<ApiException>(ag.InnerExceptions.First()));
    //        if ((ae != null)) {
    //            if ((ae.ApiError.Error.HttpStatusCode == 404)) {
    //                return this.findOrCreateInParent(this.GetRootFolder(), path);
    //            }
    //            else {
    //                throw ae;
    //            }
    //        }
    //        else {
    //            throw ag;
    //        }
    //    }
    //            return new FolderRequest("123", this);
    //}
    //        private findOrCreateInParent(parent: FolderRequest, folderPath: string): Promise<FolderRequest> {
    //    let paths = folderPath.Replace("\", " / ").Trim('/').Split('/').ToList();
    //            let folder = parent.GetAllSubfolders().FirstOrDefault(() => { }, (a.Folder.Name.ToLower() == paths[0].ToLower()));
    //    if((folder == null)) {
    //    folder = parent.CreateSubfolder(this.MakeSafeFolderName(paths[0]));
    //}
    //paths.RemoveAt(0);
    //if ((paths.Count > 0)) {
    //    folder = this.findOrCreateInParent(folder, this.MakeSafePathName(string.Join("/", paths)));
    //}
    //return folder;
    //        }
    CheckOutDocument(id) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/documents/{id}/lock`, "");
    }
    //public MoveDocument(doc: Document, parentFolder: Folder): Promise<DocumentRequest> {
    //    doc.ParentFolder = parentFolder;
    //    return this.UpdateDocument(doc);
    //}
    CancelCheckOutDocument(id) {
        return this.Requestor.Delete(`${this.GetObjectAPIUrl}/documents/{id}/lock`);
    }
    //        public QueryAll(springCMItem: SpringCMItem<T>): Promise<List< T >> {
    //    let lst: List<T> = new List<T>();
    //    let nextRes: SpringCMItem<T> = new SpringCMItem<T>();
    //    lst.AddRange(springCMItem.Items);
    //    lst.AddRange(nextRes.Items);
    //    while((nextRes.Next != null)) {
    //    nextRes = ((this.requestor.Get
    //        < (SpringCMItem < T))
    //        + "{nextRes.Next}");
    //    lst.AddRange(nextRes.Items);
    //}
    //return lst;
    //        }
    GetAttributeGroupFields(idOrHref) {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/attributegroups/${idOrHref}`);
    }
    //return this.Requestor.Get<AttributeGroups>(idOrHref);
    //        }
    getIDfromHref(href) {
        let last = (href.lastIndexOf('/') + 1);
        let end = href.length;
        let diff;
        return href.substring(last, diff);
    }
    GetRootFolder() {
        var p = new Promise((res, rej) => {
            this.Requestor.Get(`${this.GetObjectAPIUrl}/folders?systemfolder=root`).then(root => {
                res(new FolderRequest(this, undefined, undefined, root));
            }).catch(rej);
        });
        return p;
    }
    //public GetUserHomeFolder(): Promise<FolderRequest> {
    //    return new FolderRequest(this, "", "",this.Requestor.Get<Folder>(`${this.GetObjectAPIUrl}/folders?systemfolder=home`));
    //}
    //public GetEOSRootFolder(): Promise<FolderRequest> {
    //    return new FolderRequest(this.Requestor.Get<Folder>(`${this.GetObjectAPIUrl}/folders?systemfolder=othersources`), this);
    //}
    //public GetTrashFolder(): Promise<FolderRequest> {
    //    return new FolderRequest(this.Requestor.Get<Folder>(`${this.GetObjectAPIUrl}/folders?path=trash`), this);
    //}
    GetFolderByPath(path) {
        //return new Promise<FolderRequest>(this, null, path, undefined);
        var p = new Promise((res, rej) => {
            this.Requestor.Get(`${this.GetObjectAPIUrl}/folders?path=${path}`).then(root => {
                res(new FolderRequest(this, undefined, undefined, root));
            }).catch(rej);
        });
        return p;
    }
    GetFolderById(id) {
        //return new Promise<FolderRequest>(this, null, path, undefined);
        var p = new Promise((res, rej) => {
            this.Requestor.Get(`${this.GetObjectAPIUrl}/folders/${id}`).then(root => {
                res(new FolderRequest(this, undefined, undefined, root));
            }).catch(rej);
        });
        return p;
    }
    //public CreateFolder(folder: Folder): Promise<FolderRequest> {
    //    return new FolderRequest(this.Requestor.Post<Folder>(`${this.GetObjectAPIUrl}/Folders`, (folder)), this);
    //}
    CreateFolder(name, path) {
        var parentFolder;
        let parent = this.GetFolderByPath(path).then(function (result) {
            parentFolder = result.Folder;
            result.ExpandFolders = true;
        });
        const folder = {
            Name: name,
            ParentFolder: parentFolder
        };
        //let folder = [][
        //    Name = name,
        //    ParentFolder = parent;//(await parent.Folder);
        var p = new Promise((res, rej) => {
            this.Requestor.Post(`${this.GetObjectAPIUrl}/folders`, (folder)), this;
        });
        return p;
        //return new FolderRequest(this.Requestor.Post<Folder>(`${this.GetObjectAPIUrl}/Folders`, (folder)), this);
    }
    //public MoveFolder(folderToMove: Folder, destinationFolder: Folder): Promise<FolderRequest> {
    //    folderToMove.ParentFolder = destinationFolder;
    //    return this.UpdateFolder(folderToMove);
    //}
    //public UpdateFolder(folder: Folder, overwriteAllAttributes: boolean = false): Promise<FolderRequest> {
    //    if (!overwriteAllAttributes) {
    //        return new FolderRequest(this.Requestor.Patch<Folder>(folder.Href, (folder)), this);
    //    }
    //    else {
    //        return new FolderRequest(this.Requestor.Put<Folder>(folder.Href, (folder)), this);
    //    }
    //}
    FindOrCreateEOSFolder(folderName, path, objectType, objectId) {
        const eos = {
            Name: folderName,
            ObjectId: objectId,
            ObjectType: objectType,
            Path: path
        };
        const fld = {
            EosInfo: eos
        };
        var p = new Promise((res, rej) => {
            this.Requestor.Post(`${this.GetObjectAPIUrl}/folders`, (fld)).then(root => {
                res(new FolderRequest(this, undefined, undefined, root));
            }).catch(rej);
        });
        return p;
        //var p = new Promise<FolderRequest>((res, rej) => {
        //    this.Requestor.Get<Folder>(`${this.GetObjectAPIUrl}/folders?systemfolder=root`).then(root => {
        //        res(new FolderRequest(this, undefined, undefined, root));
        //    }).catch(rej);
        //})
        //return p;
        //let fold = [][
        //    EosInfo = new EosInfo{
        //        Name = folderName, ObjectId = objectId, ObjectType = objectType, Path = pathUnknown];
        //return this.CreateFolder(fld);
    }
    DeleteFolder(folder) {
        return this.Requestor.Delete(folder.Href);
    }
    //public UpdateDocument(doc: DocumentRequest, overwriteAllValues: boolean = false): Promise<DocumentRequest> {
    //    var id = doc.getID();
    //    if (overwriteAllValues) {
    //        var p = new Promise<DocumentRequest>((res, rej) => {
    //            this.Requestor.Post<Document>(`${this.GetObjectAPIUrl}/documents/${id}`, doc).then(root => {
    //                res(new DocumentRequest(this, undefined, undefined, root));
    //            }).catch(rej);
    //        });
    //        return p;
    //    }
    //    else {
    //        var p = new Promise<DocumentRequest>((res, rej) => {
    //            this.Requestor.Patch<Document>(`${this.GetObjectAPIUrl}/documents/${id}`, doc).then(root => {
    //                res(new DocumentRequest(this, undefined, undefined, root));
    //            }).catch(rej);
    //        });
    //        return p;
    //    }
    //}
    DeleteDocument(doc) {
        return this.Requestor.Delete(doc.Href);
    }
    UpdateDocument(doc, overwriteAllValues = false) {
        var id = this.getIDfromHref(doc.Href);
        if (overwriteAllValues) {
            var p = new Promise((res, rej) => {
                this.Requestor.Post(`${this.GetObjectAPIUrl}/documents/${id}`, doc).then(root => {
                    res(new DocumentRequest(this, undefined, undefined, root));
                }).catch(rej);
            });
            return p;
        }
        else {
            var p = new Promise((res, rej) => {
                this.Requestor.Patch(`${this.GetObjectAPIUrl}/documents/${id}`, doc).then(root => {
                    res(new DocumentRequest(this, undefined, undefined, root));
                }).catch(rej);
            });
            return p;
        }
    }
    GetDocumentById(id) {
        var p = new Promise((res, rej) => {
            this.Requestor.Get(`${this.GetObjectAPIUrl}/documents/${id}`).then(root => {
                res(new DocumentRequest(this, undefined, undefined, root));
            }).catch(rej);
        });
        return p;
    }
    //        public GetDocumentByPath(path: String): Promise<DocumentRequest> {
    //    return new DocumentRequest(path, this);
    //}
    CreateDocumentSearchTask(documentSearchTask, LoadAttributes = false) {
        let expand = "";
        if (LoadAttributes) {
            expand = "?expand=AttributeGroups";
        }
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/documentsearchTasks${expand}`, (documentSearchTask));
    }
    //public Search(request: DocumentSearch, LoadAttributes: boolean = false): Promise<DocumentSearch> {
    //    let expand: string = "";
    //    if(LoadAttributes) {
    //        expand = "?expand=AttributeGroups";
    //    }
    //            let requestString: string = (request);
    //    return this.Requestor.Post<DocumentSearch>(`${this.GetObjectAPIUrl}/documentsearchPromises{expand}`, requestString);
    //}
    CreateShareLink(link) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/sharelinks`, (link));
    }
    UpdateShareLink(link) {
        return this.Requestor.Put(link.Href, (link));
    }
    DeleteShareLink(link) {
        return this.Requestor.Delete(link.Href);
    }
    GetShareLink(id) {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/sharelinks/{id}`);
    }
    CreateDocumentMergeTask(documentMergeTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/DocumentMergeTask`, (documentMergeTask));
    }
    CreateCopyTask(copyTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/CopyTask`, (copyTask));
    }
    CreateFolderSearchTask(folderSearchTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/foldersearchTask`, (folderSearchTask));
    }
    CreateFolderArchiveTask(folderArchiveTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/folderarchiveTask`, (folderArchiveTask));
    }
    CreateDocumentSplitTask(splitDocumentTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/splitdocumentTask`, (splitDocumentTask));
    }
    GetSignatureTask(IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            return this.Requestor.Get(`${this.GetObjectAPIUrl}/signatureTask/{IdorHref}`);
        }
        return this.Requestor.Get(href);
    }
    CreateSignatureTask(signatureTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/signatureTask`, (signatureTask));
    }
    DeleteSignatureTask(href) {
        return this.Requestor.Delete(href);
    }
    GetExternalReviewTask(IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            return this.Requestor.Get(`${this.GetObjectAPIUrl}/externalreviewTask/{IdorHref}`);
        }
        return this.Requestor.Get(href);
    }
    CreateExternalReviewTask(externalReviewTask) {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/externalreviewTask`, (externalReviewTask));
    }
    DeleteExternalReviewTask(IdorHref) {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            return this.Requestor.Delete(`${this.GetObjectAPIUrl}/externalreviewTask/{IdorHref}`);
        }
        return this.Requestor.Delete(href);
    }
    GetExternalReviewTaskDocuments(Id) {
        return this.Requestor.Get(`${this.GetObjectAPIUrl}/externalreviewTask/{Id}/documents`);
    }
}
//# sourceMappingURL=SpringCMService.js.map