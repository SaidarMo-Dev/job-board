export interface ApiPaginatedResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  succeeded: boolean;
  totalPages: number;
  totalRecords: number;
  currentPage: number;
  pageSize: number;
  hasPreviusPage: boolean;
  hasNextPage: boolean;
}
