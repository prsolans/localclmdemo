export interface WorkflowQueue {
	Name: string;
	Description: string;
	CreatedDate: string;
	UpdatedDate: string;
	WorkItems: WorkItems;
	Href: string;
}

export interface WorkItems {
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
