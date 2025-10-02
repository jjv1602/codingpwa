export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
}

export type Request<RequestType = any> = {
  path: string;
  method: HttpMethod;
  header?: { [key: string]: string };
  params?: RequestType;
  data?: RequestType;
};

export type Response<ResponseType = any, ResponseErrorType = any> = {
  responseHeaders?: { [key: string]: string };
  status?: number;
  value?: ResponseType;
  error?: ResponseErrorType;
  success?: boolean;
};

export type GetInfoRequest = {
  viewMode?: string;
};

export type ContestInfoResponse = {
  site: string;
  title: string;
  startTime: number;
  duration: number;
  endTime: number;
  url: string;
}[];

export type ErrorResponseType = {
  statusCode: number;
  message: string;
  error?: string;
  details?: unknown;
  timestamp?: string;
  path?: string;
};


