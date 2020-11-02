import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface HttpHookProps {
  axiosInstance?: AxiosInstance;
  axiosConfig?: AxiosRequestConfig;
}

export interface HttpHook {
  get: <T>(url: string) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
  post: <TResponse = any, TBody = any>(url: string, body: TBody) => Promise<TResponse>;
  put: <TResponse = any, TBody = any>(url: string, body: TBody) => Promise<TResponse>;
  patch: <TResponse = any, TBody = any>(url: string, body: TBody) => Promise<TResponse>;
}

export const useHttp: SomeHooks.Hook<HttpHookProps, HttpHook> = ({axiosInstance, axiosConfig} = {}) => {
  const instance = axiosInstance ?? axios.create(axiosConfig);

  const get = <T>(url: string) =>
    instance.get<T>(url)
      .then(response => response.data);
  
  const _delete = <T>(url: string) =>
    instance.delete<T>(url)
      .then(response => response.data);

  const post = <TResponse, TBody>(url: string, body: TBody) =>
    instance.post<TResponse>(url, body)
      .then(response => response.data);
      
  const put = <TResponse, TBody>(url: string, body: TBody) =>
    instance.put<TResponse>(url, body)
      .then(response => response.data);

  const patch = <TResponse, TBody>(url: string, body: TBody) =>
    instance.patch<TResponse>(url, body)
      .then(response => response.data);

  return {
    get,
    delete: _delete,
    post,
    put,
    patch
  };
};