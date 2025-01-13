export function isLastPage({total, perPage, page}: { total: number, perPage: number, page: number}): boolean {
    return total / perPage <= page
}