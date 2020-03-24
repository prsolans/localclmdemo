import { AttributeGroups } from "./AttributeGroup";

export interface Account {
    Id: string;
    Name: string;
    Type: string;
    DefaultCulture: string;
    DefaultTimeZone: string;
    AttributeGroups: AttributeGroups;
    SalesForceOrgId: string;
    LogoUrl: string;
    BrandingUrl: string;
    Href: string;
}