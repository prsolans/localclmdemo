export interface Security {
    Roles?: (SecurityEntity)[] | null;
    Groups?: (SecurityEntity)[] | null;
    Users?: (SecurityEntity)[] | null;
}

export interface SecurityEntity {
    Item: string;
    AccessType: string;
}