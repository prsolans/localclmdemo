export interface SignatureTask {
	Document: Document;
	EmailSubject: string;
	EmailMessage: string;
	ToEmails: string[];
	CcEmails: string[];
	SignaturesOrdered: boolean;
	ExpirationDate: string;
	SignerPassword: string;
	InPersonSigning: boolean;
	WrittenRequired: boolean;
	Message: string;
	Status: string;
	Href: string;
}
