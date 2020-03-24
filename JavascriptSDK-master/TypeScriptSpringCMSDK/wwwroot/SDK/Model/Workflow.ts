
import { SpringCMItem } from "./SpringCMItem";

export interface Workflow {
    Name: string;
    StartDate?: string;
    EndDate?: string;
    Status?: string;
    Info?: string;
    Params?: string;
    WorkflowDocuments?: SpringCMItem<String>;
    Href?: string;
}
