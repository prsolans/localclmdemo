import { Folder } from "./Folder";
import { Document } from "./Document";

export interface CopyTask {
	DocumentsToCopy?: (Document)[] | null;
	FoldersToCopy?: (Folder)[] | null;
	DocumentResults?: (Document)[] | null;
	FolderResults?: (Folder)[] | null;
	FailedDocuments?: (FailedResult)[] | null;
	FailedFolders?: (FailedResult)[] | null;
	ResultDocument: Document;
	Message: string;
	DownloadUrl: string;
	DestinationFolder: Folder;
	DestinationDocumentName: string;
	Status: string;
	Href: string;
}
export interface FailedResult {
	Source: Folder | Document;
	Reason: string;
}
