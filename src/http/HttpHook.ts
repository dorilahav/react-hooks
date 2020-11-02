import axios, { AxiosInstance } from 'axios';

interface HttpHookProps {
  axiosInstance?: AxiosInstance;
}

interface HttpHook {
  get: <T>(url: string) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
  post: <TBody, TResponse>(url: string, body: TBody) => Promise<TResponse>;
  put: <TBody, TResponse>(url: string, body: TBody) => Promise<TResponse>;
  patch: <TBody, TResponse>(url: string, body: TBody) => Promise<TResponse>;
}

export const useHttp: SomeHooks.Hook<HttpHookProps, HttpHook> = ({axiosInstance = axios} = {}) => {
  const get = <T>(url: string) =>
    axiosInstance.get<T>(url)
      .then(response => response.data);
  
  const _delete = <T>(url: string) =>
    axiosInstance.delete<T>(url)
      .then(response => response.data);

  const post = <TBody, TResponse>(url: string, body: TBody) =>
    axiosInstance.post<TResponse>(url, body)
      .then(response => response.data);
      
  const put = <TBody, TResponse>(url: string, body: TBody) =>
    axiosInstance.put<TResponse>(url, body)
      .then(response => response.data);

  const patch = <TBody, TResponse>(url: string, body: TBody) =>
    axiosInstance.patch<TResponse>(url, body)
      .then(response => response.data);

  return {
    get,
    delete: _delete,
    post,
    put,
    patch
  };
};