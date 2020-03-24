export interface ExternalReviewTask {
	Sender: string;
	Documents: Documents;
	Recipient: Recipient;
	AlsoNotify: Recipient[];
	Status: string;
	DueDate: string;
	EmailSubject: string;
	EmailMessage: string;
	Comment: string;
	AddSignature: boolean;
	Href: string;
}

export interface Recipient {
	Name: string;
	Email: string;
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
