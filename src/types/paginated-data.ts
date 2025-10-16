export interface PaginatedData<T> {
  page: number;
  totalPages: number;
  items: T[];
}
