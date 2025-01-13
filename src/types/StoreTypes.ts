export interface StoreInterface<HitInterface> {
    totalHits: number,
    total: number,
    hits: HitInterface[],
}