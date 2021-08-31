export interface BaseResponseData<T = unknown> {
  ok: boolean;
  message?: string;
  data?: T;
}
