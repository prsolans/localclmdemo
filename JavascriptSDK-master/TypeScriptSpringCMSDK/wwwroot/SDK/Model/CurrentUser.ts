export interface CurrentUser {
	UserName: string;
	Email: string;
	FirstName: string;
	LastName: string;
	Address1: string;
	Address2: string;
	Address3: string;
	City: string;
	State: string;
	ZipCode: string;
	Title: string;
	Company: string;
	Department: string;
	EnableStartDate: string;
	EnableEndDate: string;
	FaxNumber: string;
	PhoneNumber: string;
	ManagedBy: string;
	ManagedUsers: Groups;
	WorkItems: Groups;
	RecentDocuments: Groups;
	WatchedDocumentsProcessTrackingActivities: WatchedDocumentsProcessTrackingActivities;
	WorkflowQueues: Groups;
	Groups: Groups;
	SendActivationEmail: boolean;
	Role: string;
	PermissionSets: Groups;
	Persona: string;
	PortalOnly: boolean;
	Country: string;
	WatchedDocuments: Groups;
	CreatedDate: string;
	UpdatedDate: string;
	ExemptFromUserSync: boolean;
	Href: string;
}

export interface Groups {
	Items: string[];
	Href: string;
	Offset: number;
	Limit: number;
	First: string;
	Previous: string;
	Next: string;
	Last: string;
	Total: number;
}

export interface WatchedDocumentsProcessTrackingActivities {
	Items: WatchedDocumentsProcessTrackingActivitiesItem[];
	Href: string;
	Offset: number;
	Limit: number;
	First: string;
	Previous: string;
	Next: string;
	Last: string;
	Total: number;
}

export interface WatchedDocumentsProcessTrackingActivitiesItem {
	Name: string;
	TypeName: string;
	Status: string;
	Output: string;
	StageName: string;
	StartDate: string;
	EndDate: string;
	DueDate: string;
	ProcessUid: ProcessUid;
	ProcessName: string;
	Document: string;
	UserActions: UserActions;
	Href: string;
}

export interface ProcessUid {
}

export interface UserActions {
	Items: UserActionsItem[];
	Href: string;
	Offset: number;
	Limit: number;
	First: string;
	Previous: string;
	Next: string;
	Last: string;
	Total: number;
}

export interface UserActionsItem {
	AssignedTo: ActionBy;
	WorkflowQueue: string;
	Action: string;
	Output: string;
	Comments: string;
	AssignedBy: ActionBy;
	ActionBy: ActionBy;
	StartDate: string;
	UpdatedDate: string;
	EndDate: string;
}

export interface ActionBy {
	Email: string;
	FullName: string;
	User: string;
}
