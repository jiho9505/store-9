export interface PageRequest<SortBy = unknown> {
  size?: number;
  page?: number;
  sortBy?: SortBy;
}
