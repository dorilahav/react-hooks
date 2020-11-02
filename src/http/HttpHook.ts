import axios from 'axios';

interface HttpHook {
  get: <T>(url: string) => Promise<T>
}

export const useHttp = (): HttpHook => {
  const get = <T>(url: string) =>
    axios.get<T>(url)
      .then(response => response.data);

  return {
    get
  };
};