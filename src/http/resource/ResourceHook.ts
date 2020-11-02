import {HttpHookProps, useHttp} from '../HttpHook';

interface HttpResourceHookProps extends HttpHookProps {
  url: string;
}

interface HttpResourceHook<T, TId = string> {
  getAll: () => Promise<T[]>;
  getById: (id: TId) => Promise<T>;
  create: (entity: T) => Promise<T | undefined>;
  delete: (id: TId) => Promise<T | undefined>;
  update: (id: TId, updates: Partial<T>) => Promise<T | undefined>;
  replace: (id: TId, newEntity: T) => Promise<T | undefined>;
}

export const useHttpResource = <T, TId = string>({url, ...httpHookProps} = {} as HttpResourceHookProps): HttpResourceHook<T, TId> => {
  const http = useHttp(httpHookProps);

  if (!url) {
    throw new Error('Cannot create a useHttpResource hook without specifying url!');
  }

  const getAll = () =>
    http.get<T[]>(url);
  
  const getById = (id: TId) =>
    http.get<T>(`${url}/${id}`);

  const create = (entity: T) =>
    http.post<T | undefined, T>(url, entity);

  const _delete = (id: TId) =>
    http.delete<T | undefined>(`${url}/${id}`);

  const update = (id: TId, updates: Partial<T>) =>
    http.patch<T | undefined, Partial<T>>(`${url}/${id}`, updates);

  const replace = (id: TId, newEntity: T) =>
    http.put<T | undefined, T>(`${url}/${id}`, newEntity);

  return {
    getAll,
    getById,
    create,
    delete: _delete,
    update,
    replace
  };
};