export interface WorkItem {
	Name: string;
	Type: string;
	Assignee: string;
	AssignDate: string;
	DueDate: string;
	Documents: Documents;
	AssigneeInstructions: string;
	Workflow: string;
	Selections: Select;
	Selected: Select;
	CreatedDate: string;
	WorkItemUrl: string;
	Href: string;
}

export interface Documents {
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

export interface Select {
	Items: string[];
	Comment: string;
	Allowed: string;
}
