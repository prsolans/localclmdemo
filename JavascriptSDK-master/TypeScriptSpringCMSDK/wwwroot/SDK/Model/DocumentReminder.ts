export interface DocumentReminder {
	Name: string;
	ReminderDate: string;
	RecipientContacts: RecipientContactsOrRecipientUsersOrRecipientGroups;
	RecipientUsers: RecipientContactsOrRecipientUsersOrRecipientGroups;
	RecipientGroups: RecipientContactsOrRecipientUsersOrRecipientGroups;
	RecipientAdHocEmails?: (string)[] | null;
	Document: string;
	EmailSubject: string;
	EmailBody: string;
	EmailFromAddress: string;
	CreatedDate: string;
	CreatedBy: string;
	UpdatedDate: string;
	UpdatedBy: string;
	Href: string;
}
export interface RecipientContactsOrRecipientUsersOrRecipientGroups {
	Items?: (string)[] | null;
	Href: string;
	Offset: number;
	Limit: number;
	First: string;
	Previous: string;
	Next: string;
	Last: string;
	Total: number;
}
