export interface Request<TData = undefined> {
  data: TData;
  headers: Headers;
}
