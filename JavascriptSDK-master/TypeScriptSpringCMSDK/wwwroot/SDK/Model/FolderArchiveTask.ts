import { Document } from "./Document";
import { Folder } from "./Folder";

export interface FolderArchiveTask {
	BaseFolder: Folder;
	DocumentsToZip: SToZip;
	FoldersToZip: SToZip;
	ArchiveSize: number;
	ResultDocument: Document;
	Message: string;
	DownloadUrl: string;
	DestinationFolder: Folder;
	DestinationDocumentName: string;
	Status: string;
	Href: string;
}

export interface SToZip {
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
