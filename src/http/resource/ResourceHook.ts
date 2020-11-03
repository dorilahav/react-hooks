import {HttpHookProps, useHttp} from '../HttpHook';

interface HttpResourceHookProps extends HttpHookProps {
  url: string;
}

interface HttpResourceHook<TViewModel, TId = string> {
  getAll: () => Promise<TViewModel[]>;
  getById: (id: TId) => Promise<TViewModel>;
  create: (entity: TViewModel) => Promise<TViewModel>;
  delete: (id: TId) => Promise<TViewModel>;
  update: (newEntity: TViewModel) => Promise<TViewModel>;
}

export const useHttpResource = <TViewModel, TId = string>({url, ...httpHookProps} = {} as HttpResourceHookProps): HttpResourceHook<TViewModel, TId> => {
  const http = useHttp(httpHookProps);

  if (!url) {
    throw new Error('Cannot create a useHttpResource hook without specifying url!');
  }

  const getAll = () =>
    http.get<TViewModel[]>(url);

  const getById = (id: TId) =>
    http.get<TViewModel>(`${url}/${id}`);

  const create = (entity: TViewModel) =>
    http.post<TViewModel, TViewModel>(url, entity);

  const _delete = (id: TId) =>
    http.delete<TViewModel>(`${url}/${id}`);

  const update = (newEntity: TViewModel) =>
    http.put<TViewModel, TViewModel>(url, newEntity);

  return {
    getAll,
    getById,
    create,
    delete: _delete,
    update
  };
};