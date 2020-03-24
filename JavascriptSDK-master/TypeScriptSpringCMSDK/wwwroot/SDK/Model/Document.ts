import { SpringCMItem } from "./SpringCMItem";
import { Document } from "./Document";
import { ShareLink } from "./shareLink";
import { DocumentReminder } from "./DocumentReminder";
import { WorkItem } from "./WorkItem";
import { HistoryItem } from "./HistoryItems";
import { AccessLevel } from "./AccessLevel";
import { Lock } from "./Lock";
import { EosInfo } from "./EosInfo";
//import { DocumentProcessTrackingActivity } from "./DocumentProcessTrackingActivities";

export interface Document {
    Name: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    Description: string;
    ParentFolder: string;
    Path: string;
    HistoryItems: SpringCMItem<HistoryItem>;
    AttributeGroups: string;
    AccessLevel: AccessLevel;
    PageCount: number;
    EosParentInfo: EosInfo;
    Lock: Lock;
    Version: string;
    PreviewUrl: string;
    Versions: SpringCMItem<Document>;
    ShareLinks: SpringCMItem<ShareLink>;
    //DocumentProcessTrackingActivities: DocumentProcessTrackingActivity;
    DocumentReminders: SpringCMItem<DocumentReminder>;
    RelatedDocuments: SpringCMItem<Document>;
    WorkItems: SpringCMItem<WorkItem>;
    DownloadDocumentHref: string;
    NativeFileSize: number;
    PdfFileSize: number;
    Href: string;
}