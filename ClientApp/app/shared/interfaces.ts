export interface SubDomain {
    id: number;
    domainName: string;
}

export interface SubDomainDetails {
    id: number;
    domainName: string;
    subdomainName: string;
    ipAddresses: string;
}


export interface Pagination {
    CurrentPage: number;
    ItemsPerPage: number;
    TotalItems: number;
    TotalPages: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}

export interface Predicate<T> {
    (item: T): boolean
}

