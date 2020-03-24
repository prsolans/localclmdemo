import { IAuthenticator } from "../Authentication/IAuthentication";

import { IHttpRequestor } from "./IHttpRequest";
import { Account } from "../Model/Account";
import { SpringCMItem } from "../Model/SpringCMItem";
import { AttributeGroups } from "../Model/AttributeGroup";
import { DocLauncher } from "../Model/DocLauncher";
import { PermissionSet } from "../Model/PermissionSet";
import { DocLauncherTask } from "../Model/DocLauncherTask";
import { Contacts } from "../Model/Contacts";
import { Workflow } from "../Model/Workflow";
import { WorkflowQueue } from "../Model/WorkflowQueue";
import { WorkItem } from "../Model/WorkItem";
import { Validator } from "./validator";
import { StaticTokenAuthenication } from "../Authentication/StaticTokenAuthentication";
import { APIUserAuthenticator } from "../Authentication/APIUserAuthentication";
import { FolderRequest } from "../Requests/FolderRequest";
import { Folder } from "../Model/Folder";
import { DocumentReminder } from "../Model/DocumentReminder";
import { ShareLink } from "../Model/shareLink";
import { Group } from "../Model/Group";
import { DocumentMergeTask } from "../Model/DocumentMergeTask";
import { CopyTask } from "../Model/CopyTask";
import { FolderSearchTask } from "../Model/FolderSearchTask";
import { FolderArchiveTask } from "../Model/FolderArchiveTask";
import { User } from "../Model/User";
import { DocumentSearch } from "../Model/DocumentSearch";
import { SplitDocumentTask } from "../Model/SplitDocumentTask";
import { SignatureTask } from "../Model/SignatureTask";
import { ExternalReviewTask } from "../Model/ExternalReviewTask";
import { DocumentProcessTrackingActivity } from "../Model/DocumentProcessTrackingActivity";
import { DocumentRequest } from "../Requests/DocumentRequest";
import { Lock } from "../Model/Lock";
import { EosInfo } from "../Model/EosInfo";
import { Document } from "../Model/Document";
import Stream from "ts-stream";



export class SpringCMServiceBase {

    public DefaultQueryBatch: number;

    public constructor(auth: IAuthenticator, datacenter: string) {
        this.Datacenter = datacenter;
        this.GetObjectAPIUrl = `https://api${this.Datacenter}.springcm.com/${this.ApplicationVersion}`;
        this.GetUploadAPIUrl = `https://apiupload${this.Datacenter}.springcm.com/${this.ApplicationVersion}`;
        this.GetDownloadAPIUrl = `https://apidownload${this.Datacenter}.springcm.com/${this.ApplicationVersion}`;
    }

    public ApplicationVersion: string = "v201411";

    private Datacenter: string


    public GetObjectAPIUrl: string;

    public GetUploadAPIUrl: string;

    public GetDownloadAPIUrl: string;

    public Requestor: IHttpRequestor

    public GetCurrentAccount(): Promise<Account> {
        return this.Requestor.Get<Account>(`${this.GetObjectAPIUrl}/accounts/current`);
    }

    public UpdateAccount(act: Account): Promise<Account> {
        return this.Requestor.Patch<Account>(act.Href, act);
    }

    public GetCurrentAccountAttributeGroups(): Promise<SpringCMItem<AttributeGroups>> {
        return this.Requestor.Get<SpringCMItem<AttributeGroups>>(`${this.GetObjectAPIUrl}/accounts/current/attributegroups`);

    }

    //public QueryNext(springCMItem: SpringCMItem<T>): Promise<SpringCMItem<T>> {
    //    return this.Requestor.Get<SpringCMItem<T>>(`${this.springCMItem.Next}`);
    //}

    public GetAllDocLauncherConfigs(): Promise<SpringCMItem<DocLauncher>> {
        return this.Requestor.Get<SpringCMItem<DocLauncher>>(`${this.GetObjectAPIUrl}/doclauncherconfigurations`);
    }

    public GetAllPermissionSets(): Promise<SpringCMItem<PermissionSet>> {
        return this.Requestor.Get<SpringCMItem<PermissionSet>>(`${this.GetObjectAPIUrl}/permissionsets`);
    }

    public GetDocLauncherTask(IdorHref: string): Promise<DocLauncherTask> {
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/doclauncherTasks/${IdorHref}`;
        }

        return this.Requestor.Get<DocLauncherTask>(href);
    }

    public CreateDocLauncherTask(DocLauncherTask: DocLauncherTask): Promise<DocLauncherTask> {
        return this.Requestor.Post<DocLauncherTask>(`${this.GetObjectAPIUrl}/DocLauncherTasks`, DocLauncherTask);
    }

    public GetAllContacts(): Promise<SpringCMItem<Contacts>> {
        return this.Requestor.Get<SpringCMItem<Contacts>>(`${this.GetObjectAPIUrl}/contacts`);
    }

    public GetContactById(Id: string): Promise<Contacts> {
        return this.Requestor.Get<Contacts>(`${this.GetObjectAPIUrl}/contacts/{Id}`);
    }

    public CreateContact(contact: Contacts): Promise<Contacts> {
        return this.Requestor.Post<Contacts>(`${this.GetObjectAPIUrl}/contacts/`, contact);
    }

    public UpdateContact(contact: Contacts): Promise<Contacts> {
        return this.Requestor.Put<Contacts>(contact.Href, contact);
    }

    public DeleteContact(contact: Contacts): Promise<Contacts> {
        return this.Requestor.Delete<Contacts>(contact.Href);
    }

    public GetWorkflow(IdorHref: string): Promise<Workflow> {
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workflows/${IdorHref}`;
        }

        return this.Requestor.Get<Workflow>(href);
    }

    public StartWorkflow(workflow: Workflow): Promise<Workflow> {
        return this.Requestor.Post<Workflow>(`${this.GetObjectAPIUrl}/workflows/`, (workflow));
    }

    public SignalWorkflow(workflow: Workflow, data: string): Promise<Workflow> {
        return this.Requestor.Post<Workflow>(`${workflow.Href}/signal`, `{"data":"${data}" }`);
    }

    public DeleteWorkflow(workflow: Workflow): Promise<Workflow> {
        return this.Requestor.Delete<Workflow>(workflow.Href);
    }

    public GetWorkflowQueue(IdorHref: string): Promise<SpringCMItem<WorkflowQueue>> {
        //         let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workflowqueues/${IdorHref}`;
        }

        return;
    }

    public GetWorkflowQueueWorkItems(IdorHref: string): Promise<SpringCMItem<WorkItem>> {
        //         let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workflowqueues/${IdorHref}/workitems`;
        }

        return;
    }

    public GetWorkItem(IdorHref: string, assignee: boolean = false, documents: boolean = false, assigneeInstructions: boolean = false, workflow: boolean = false, selections: boolean = false): Promise<WorkItem> {
        //        let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workitems/${IdorHref}`;
        }

        let expandString: Array<String> = [];
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
            return this.Requestor.Get<WorkItem>(href);
        }
        let expand = `expand=${expandString.join(',')}`;
        return this.Requestor.Get<WorkItem>(`${href}?expand=${expand}`);

    };

    //        ///  <summary>
    //        ///  Method accepts an ID or an HREF
    //        ///  Brings back documents assigned to a user via SpringCM Promise
    //        ///  </summary>
    //        ///  <param name="IdorHref"></param>
    //        ///  <returns>Returns a list of documents associated to the Promises assigned to a user</returns>
    public GetWorkItemDocuments(IdorHref: string): Promise<SpringCMItem<Document>> {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workitems/{IdorHref}/documents`;
        }

        return this.Requestor.Get<SpringCMItem<Document>>(href);
    }

    //        ///  <summary>
    //        ///   Method accepts an ID or an HREF
    //        ///   Currently this method does not work but may in the future.
    //        ///  </summary>
    //        ///  <param name="workitem"></param>
    //        ///  <param name="IdorHref"></param>
    //        ///  <returns></returns>
    public UpdateWorkitem(workitem: WorkItem, IdorHref: string): Promise<WorkItem> {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/workitems/{IdorHref}`;
        }

        return this.Requestor.Patch<WorkItem>("{href}", (workitem));
    }

    public GetDocumentReminder(IdorHref: string): Promise<DocumentReminder> {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/DocumentReminders/{id}`;
        }

        return this.Requestor.Get<DocumentReminder>((href + "?expand=Documents,RecipientUsers,RecipientGroups"));
    }

    public CreateDocumentReminder(documentReminder: DocumentReminder): Promise<DocumentReminder> {
        return this.Requestor.Post<DocumentReminder>(`${this.GetObjectAPIUrl}/DocumentReminders/`, (documentReminder));
    }

    public UpdateDocumentReminder(documentReminder: DocumentReminder): Promise<DocumentReminder> {
        return this.Requestor.Put<DocumentReminder>(documentReminder.Href, (documentReminder));
    }

    public DeleteDocumentReminder(documentReminder: DocumentReminder): Promise<DocumentReminder> {
        return this.Requestor.Delete<DocumentReminder>(documentReminder.Href);
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

    public GetGroupMembers(IdorHref: string): Promise<SpringCMItem<User>> {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/Groups/{IdorHref}`;
        }

        return this.Requestor.Get<SpringCMItem<User>>("{href}/groupmembers");
    }

    public CreateGroup(group: Group): Promise<Group> {
        return this.Requestor.Post<Group>(`${this.GetObjectAPIUrl}/groups/`, (group));
    }

    public UpdateGroup(group: Group, overwriteMembers: boolean = false): Promise<Group> {
        if (overwriteMembers) {
            return this.Requestor.Put<Group>("{group.Href}", (group));
        }

        return this.Requestor.Patch<Group>("{group.Href}", (group));
    }

    public DeleteGroup(group: Group): Promise<Group> {
        return this.Requestor.Delete<Group>(group.Href);
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

    public GetCurrentUsersWatchedDocuments(): Promise<SpringCMItem<Document>> {
        return this.Requestor.Get<SpringCMItem<Document>>(`${this.GetObjectAPIUrl}/users/current/watcheddocuments`);
    }

    public GetCurrentUsersWatchedDocumentsProcessTractingActivites(): Promise<SpringCMItem<DocumentProcessTrackingActivity>> {
        return this.Requestor.Get<SpringCMItem<DocumentProcessTrackingActivity>>(`${this.GetObjectAPIUrl}/users/current/watcheddocumentsprocesstrackingactivities`);
    }


    public GetCurrentUsersWorkItems(IdorHref: string): Promise<SpringCMItem<WorkItem>> {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            href = `${this.GetObjectAPIUrl}/users/{IdorHref}/workitems`;
        }

        return this.Requestor.Get<SpringCMItem<WorkItem>>(href);
    }

    public UploadDocument(folder: Folder, file: Stream, fileName: string): Promise<DocumentRequest> {

        return this.Requestor.PostFile<DocumentRequest>(`${this.GetUploadAPIUrl}/folders/${this.getIDfromHref(folder.Href)}/documents`, file, fileName);
    }

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

    public CheckOutDocument(id: string): Promise<Lock> {
        return this.Requestor.Post(`${this.GetObjectAPIUrl}/documents/{id}/lock`, "");
    }

    //public MoveDocument(doc: Document, parentFolder: Folder): Promise<DocumentRequest> {
    //    doc.ParentFolder = parentFolder;
    //    return this.UpdateDocument(doc);
    //}

    public CancelCheckOutDocument(id: string): Promise<Lock> {
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

    public GetAttributeGroupFields(idOrHref: string): Promise<AttributeGroups> {
        return this.Requestor.Get<AttributeGroups>(`${this.GetObjectAPIUrl}/attributegroups/${idOrHref}`);
    }

    //return this.Requestor.Get<AttributeGroups>(idOrHref);
    //        }

    public getIDfromHref(href: string): string {
        let last = (href.lastIndexOf('/') + 1);
        let end = href.length;
        let diff;
        return href.substring(last, diff);
    }

    public GetRootFolder(): Promise<FolderRequest> {
        var p = new Promise<FolderRequest>((res, rej) => {
            this.Requestor.Get<Folder>(`${this.GetObjectAPIUrl}/folders?systemfolder=root`).then(root => {
                res(new FolderRequest(this, undefined, undefined, root));
            }).catch(rej);

        })
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

    public GetFolderByPath(path: string): Promise<FolderRequest> {
        //return new Promise<FolderRequest>(this, null, path, undefined);

        var p = new Promise<FolderRequest>((res, rej) => {
            this.Requestor.Get<Folder>(`${this.GetObjectAPIUrl}/folders?path=${path}`).then(root => {
                res(new FolderRequest(this, undefined, undefined, root));
            }).catch(rej);

        })
        return p;
    }

    public GetFolderById(id: string): Promise<FolderRequest> {
        //return new Promise<FolderRequest>(this, null, path, undefined);

        var p = new Promise<FolderRequest>((res, rej) => {
            this.Requestor.Get<Folder>(`${this.GetObjectAPIUrl}/folders/${id}`).then(root => {
                res(new FolderRequest(this, undefined, undefined, root));
            }).catch(rej);

        })
        return p;
    }

    //public CreateFolder(folder: Folder): Promise<FolderRequest> {
    //    return new FolderRequest(this.Requestor.Post<Folder>(`${this.GetObjectAPIUrl}/Folders`, (folder)), this);
    //}

    public CreateFolder(name: string, path: string): Promise<FolderRequest> {

        var parentFolder;
        let parent = this.GetFolderByPath(path).then(function (result) {
            parentFolder = result.Folder;
            result.ExpandFolders = true;
        });
        
        const folder = <Folder>{
            Name: name,
            ParentFolder: parentFolder
        };

        //let folder = [][
        //    Name = name,
        //    ParentFolder = parent;//(await parent.Folder);

        var p = new Promise<FolderRequest>((res, rej) => {
            this.Requestor.Post<Folder>(`${this.GetObjectAPIUrl}/folders`, (folder)), this

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

    public FindOrCreateEOSFolder(folderName: string, path: string, objectType: string, objectId: string): Promise<FolderRequest> {

        const eos = <EosInfo>{
            Name: folderName,
            ObjectId: objectId,
            ObjectType: objectType,
            Path: path
        }

        const fld = <Folder>{
            EosInfo: eos
        };

        var p = new Promise<FolderRequest>((res, rej) => {
            this.Requestor.Post<Folder>(`${this.GetObjectAPIUrl}/folders`, (fld)).then(root => {
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

    public DeleteFolder(folder: Folder): Promise<Folder> {
        return this.Requestor.Delete<Folder>(folder.Href);
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

    public DeleteDocument(doc: Document): Promise<Document> {
        return this.Requestor.Delete<Document>(doc.Href);
    }

    public UpdateDocument(doc: Document, overwriteAllValues: boolean = false): Promise<DocumentRequest> {

        var id = this.getIDfromHref(doc.Href);

        if (overwriteAllValues) {
            var p = new Promise<DocumentRequest>((res, rej) => {
                this.Requestor.Post<Document>(`${this.GetObjectAPIUrl}/documents/${id}`, doc).then(root => {
                    res(new DocumentRequest(this, undefined, undefined, root));
                }).catch(rej);

            });
            return p;

        } else {
            var p = new Promise<DocumentRequest>((res, rej) => {
                this.Requestor.Patch<Document>(`${this.GetObjectAPIUrl}/documents/${id}`, doc).then(root => {
                    res(new DocumentRequest(this, undefined, undefined, root));
                }).catch(rej);

            });
            return p;
        }


    }

    public GetDocumentById(id: string): Promise<DocumentRequest> {
        var p = new Promise<DocumentRequest>((res, rej) => {
            this.Requestor.Get<Document>(`${this.GetObjectAPIUrl}/documents/${id}`).then(root => {
                res(new DocumentRequest(this, undefined, undefined, root));
                    }).catch(rej);

                });
                return p;
    }

    //        public GetDocumentByPath(path: String): Promise<DocumentRequest> {
    //    return new DocumentRequest(path, this);
    //}

    public CreateDocumentSearchTask(documentSearchTask: DocumentSearch, LoadAttributes: boolean = false): Promise<DocumentSearch> {
        let expand: string = "";
        if (LoadAttributes) {
            expand = "?expand=AttributeGroups";
        }

        return this.Requestor.Post<DocumentSearch>(`${this.GetObjectAPIUrl}/documentsearchTasks${expand}`, (documentSearchTask));
    }

    //public Search(request: DocumentSearch, LoadAttributes: boolean = false): Promise<DocumentSearch> {
    //    let expand: string = "";
    //    if(LoadAttributes) {
    //        expand = "?expand=AttributeGroups";
    //    }

    //            let requestString: string = (request);
    //    return this.Requestor.Post<DocumentSearch>(`${this.GetObjectAPIUrl}/documentsearchPromises{expand}`, requestString);
    //}

    public CreateShareLink(link: ShareLink): Promise<ShareLink> {
        return this.Requestor.Post<ShareLink>(`${this.GetObjectAPIUrl}/sharelinks`, (link));
    }

    public UpdateShareLink(link: ShareLink): Promise<ShareLink> {
        return this.Requestor.Put<ShareLink>(link.Href, (link));
    }

    public DeleteShareLink(link: ShareLink): Promise<ShareLink> {
        return this.Requestor.Delete<ShareLink>(link.Href);
    }

    public GetShareLink(id: String): Promise<ShareLink> {
        return this.Requestor.Get<ShareLink>(`${this.GetObjectAPIUrl}/sharelinks/{id}`);
    }

    public CreateDocumentMergeTask(documentMergeTask: DocumentMergeTask): Promise<DocumentMergeTask> {
        return this.Requestor.Post<DocumentMergeTask>(`${this.GetObjectAPIUrl}/DocumentMergeTask`, (documentMergeTask));
    }

    public CreateCopyTask(copyTask: CopyTask): Promise<CopyTask> {
        return this.Requestor.Post<CopyTask>(`${this.GetObjectAPIUrl}/CopyTask`, (copyTask));
    }

    public CreateFolderSearchTask(folderSearchTask: FolderSearchTask): Promise<FolderSearchTask> {
        return this.Requestor.Post<FolderSearchTask>(`${this.GetObjectAPIUrl}/foldersearchTask`, (folderSearchTask));
    }

    public CreateFolderArchiveTask(folderArchiveTask: FolderArchiveTask): Promise<FolderArchiveTask> {
        return this.Requestor.Post<FolderArchiveTask>(`${this.GetObjectAPIUrl}/folderarchiveTask`, (folderArchiveTask));
    }

    public CreateDocumentSplitTask(splitDocumentTask: SplitDocumentTask): Promise<SplitDocumentTask> {
        return this.Requestor.Post<SplitDocumentTask>(`${this.GetObjectAPIUrl}/splitdocumentTask`, (splitDocumentTask));
    }

    public GetSignatureTask(IdorHref: string): Promise<SignatureTask> {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            return this.Requestor.Get<SignatureTask>(`${this.GetObjectAPIUrl}/signatureTask/{IdorHref}`);
        }

        return this.Requestor.Get<SignatureTask>(href);
    }

    public CreateSignatureTask(signatureTask: SignatureTask): Promise<SignatureTask> {
        return this.Requestor.Post<SignatureTask>(`${this.GetObjectAPIUrl}/signatureTask`, (signatureTask));
    }

    public DeleteSignatureTask(href: string): Promise<SignatureTask> {
        return this.Requestor.Delete<SignatureTask>(href);
    }

    public GetExternalReviewTask(IdorHref: string): Promise<ExternalReviewTask> {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            return this.Requestor.Get<ExternalReviewTask>(`${this.GetObjectAPIUrl}/externalreviewTask/{IdorHref}`);
        }

        return this.Requestor.Get<ExternalReviewTask>(href);
    }

    public CreateExternalReviewTask(externalReviewTask: ExternalReviewTask): Promise<ExternalReviewTask> {
        return this.Requestor.Post<ExternalReviewTask>(`${this.GetObjectAPIUrl}/externalreviewTask`, (externalReviewTask));
    }

    public DeleteExternalReviewTask(IdorHref: string): Promise<ExternalReviewTask> {
        //			let id: Guid;
        let href = IdorHref;
        if (Validator.isUUID(IdorHref)) {
            return this.Requestor.Delete<ExternalReviewTask>(`${this.GetObjectAPIUrl}/externalreviewTask/{IdorHref}`);
        }

        return this.Requestor.Delete<ExternalReviewTask>(href);
    }

    public GetExternalReviewTaskDocuments(Id: string): Promise<ExternalReviewTask> {
        return this.Requestor.Get<ExternalReviewTask>(`${this.GetObjectAPIUrl}/externalreviewTask/{Id}/documents`);
    }
}