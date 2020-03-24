import { Folder } from "./Folder";
import { Document } from "./Document";

export interface ShareLink {
	Url: string;
	ExpirationDate: string;
	AllowNativeDownload: boolean;
	AllowPdfDownload: boolean;
	PreviewBehavior: string;
	CreatedBy: string;
	UpdatedBy: string;
	CreatedDate: string;
	UpdatedDate: string;
	Folder: Folder;
	Document: Document;
	Href: string;
}
