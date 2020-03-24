import { User } from "./User";

export interface Group {
	Name: string;
	Description: string;
	GroupType: string;
	GroupMembers: GroupMembers;
	CreatedDate: string;
	UpdatedDate: string;
	Href: string;
}
export interface GroupMembers {
	Items?: (User)[] | null;
	Href: string;
	Offset: number;
	Limit: number;
	First: string;
	Previous: string;
	Next: string;
	Last: string;
	Total: number;
}
