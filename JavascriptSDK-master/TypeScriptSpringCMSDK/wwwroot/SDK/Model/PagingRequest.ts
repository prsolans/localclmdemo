export interface PagingRequest {
    Offset?: number;
    Limit?: number;
    SortProperty?: string;
    SortDirection?: string;
    Filter?: string;
}