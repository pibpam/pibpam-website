export interface IPaginationData {
    page: number
    total: number
    limit: number
    totalPage: number
}

export interface IPagination {
    pagination: IPaginationData
}
