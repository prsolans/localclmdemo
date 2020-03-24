import { DocLauncher } from "./DocLauncher";
import { Folder } from "./Folder";

export interface DocLauncherTask {
	Data?: string;
	DataType?: string;
	DestinationFolder?: Folder;
	DocLauncherConfiguration?: DocLauncher;
	UrlExpirationDate?: string;
	DocLauncherResultUrl?: string;
	Status?: string;
	Href?: string;
}
