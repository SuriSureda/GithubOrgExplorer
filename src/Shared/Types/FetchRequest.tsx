export type FetchRequest = {
  url: string;
  method?: 'GET' | 'POST';
  body?: BodyInit;
  headers?: HeadersInit;
};
