export interface ApiResponse<T> {
  data: T;
  errors: string[] | null;
  message: string;
  statusCode: number;
  succeeded: boolean;
}
