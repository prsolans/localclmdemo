import { Folder } from "./Folder";

export interface SplitDocumentTask {
	Document: Document;
	Pages: string;
	ResultDocument: string;
	Message: string;
	DownloadUrl: string;
	DestinationFolder: Folder;
	DestinationDocumentName: string;
	Status: string;
	Href: string;
}