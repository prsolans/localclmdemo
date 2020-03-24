import { SpringCMItem } from "./SpringCMItem";
import { UserAction } from "./UserActions";

export interface DocumentProcessTrackingActivity {
    Name: string;
    TypeName: string;
    Status: string;
    Output: string;
    StageName: string;
    StartDate: string;
    EndDate: string;
    DueDate: string;
    ProcessUid: string;
    ProcessName: string;
    Document: string;
    UserActions: SpringCMItem<UserAction>;
    Href: string;
}