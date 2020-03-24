import { AttributeGroup, AttributeField } from "./Attributes";
import { Folder } from "./Folder";

export interface DocumentSearch {
    Content: string;
    Extensions: string;
    UpdatedOnOrAfter: string;
    UpdatedOnOrBefore: string;
    AnyAttributeField: string;
    AttributeGroups: AttributeGroup[];
    AttributeFields: AttributeField[];
    Status: string;
    AllWords: string;
    AnyWords: string;
    WithoutWords: string;
    Phrase: string;
    InFolder: Folder;
    IncludeSubFolders: boolean;
    Title: string;
    Description: string;
    UpdatedBy: string;
    Result: Result;
    Href: string;
}

export interface Result {
    Items: Item[];
    Href: string;
    Offset: number;
    Limit: number;
    First: string;
    Previous: string;
    Next: string;
    Last: string;
    Total: number;
}

export interface Item {
    Href: string;
}
