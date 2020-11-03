import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {useEffect} from 'react';

export type AxiosInterceptor<T> =
  [(value: T) => T | Promise<T>] |
  [
    (value: T) => T | Promise<T>,
    (error: any) => any
  ];

export interface AxiosInterceptors {
  request?: [AxiosInterceptor<AxiosRequestConfig>],
  response?: [AxiosInterceptor<AxiosResponse>]
}

export interface HttpHookProps {
  axiosInstance?: AxiosInstance;
  axiosConfig?: AxiosRequestConfig;
  interceptors?: AxiosInterceptors;
}

export interface HttpHook {
  get: <T>(url: string) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
  post: <TResponse = any, TBody = any>(url: string, body: TBody) => Promise<TResponse>;
  put: <TResponse = any, TBody = any>(url: string, body: TBody) => Promise<TResponse>;
  patch: <TResponse = any, TBody = any>(url: string, body: TBody) => Promise<TResponse>;
}

export const useHttp = ({axiosInstance, axiosConfig, interceptors} = {} as HttpHookProps): HttpHook => {
  const instance = axiosInstance ?? axios.create(axiosConfig);

  const registerInterceptors = () => {
    interceptors?.request?.map(interceptor => instance.interceptors.request.use(...interceptor));
    interceptors?.response?.map(interceptor => instance.interceptors.response.use(...interceptor));
  }

  useEffect(() => {
    if (!instance) {
      return
    }

    registerInterceptors();
  }, [instance]);

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