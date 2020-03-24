import { HistoryItem} from "./HistoryItems";
import { AccessLevel } from "./AccessLevel";
import { EosInfo } from "./EosInfo";
import { Lock } from "./Lock";
import { SpringCMItem } from "./SpringCMItem";
import { Security } from "./Security";
//import { DocumentProcessTrackingActivity } from "./DocumentProcessTrackingActivities";
import { ShareLink } from "./shareLink";
export interface Folder {
    Name?: string;
    CreatedDate?: string;
    CreatedBy?: string;
    UpdatedDate?: string;
    UpdatedBy?: string;
    Description?: string;
    ParentFolder?: string;
    BrowseDocumentsUrl?: string;
    AccessLevel?: AccessLevel;
    Documents?: SpringCMItem<Document>;
    Folders?: SpringCMItem<Folder>;
    Path?: string;
    AttributeGroups?: string;
    EosInfo?: EosInfo;
    EosParentInfo?: EosInfo;
    ShareLinks?: SpringCMItem<ShareLink>;
    Security?: Security;
    CreateDocumentHref?: string;
    Href?: string;
}

