import { Document } from "./Document";
import { Folder } from "./Folder";

export interface DocumentMergeTask {
	DocumentsToMerge?: (Document)[] | null;
	DeleteOriginals: boolean;
	ResultDocument: Document;
	Message: string;
	DownloadUrl: string;
	DestinationFolder: Folder;
	DestinationDocumentName: string;
	Status: string;
	Href: string;
}
