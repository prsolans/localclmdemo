export interface Contacts {
	Email: string;
	FirstName: string;
	LastName: string;
	Address1: string;
	Address2: string;
	Address3: string;
	City: string;
	State: string;
	ZipCode: string;
	Country: string;
	Title: string;
	Company: string;
	Department: string;
	FaxNumber: string;
	PhoneNumber: string;
	Shared: boolean;
	Groups: Groups;
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