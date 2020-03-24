import { User } from "./User";

export interface UserAction {
    AssignedTo: User;
    WorkflowQueue: string;
    Action: string;
    Output: string;
    Comments: string;
    AssignedBy: User;
    ActionBy: User;
    StartDate: string;
    UpdatedDate: string;
    EndDate: string;
}