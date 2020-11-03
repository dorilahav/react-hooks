import {useHttp, HttpHookProps} from '../http';
import {useStorage} from '../storage';
import {StorageType} from '../storage/Storages';

interface DefaultLoginViewModel {
  username: string;
  password: string;
}

type TokenRetreiver<T> = (loginResponse: T) => string | Promise<string>;

export interface AuthHookProps<TLoginResponse = string> extends HttpHookProps {
  loginUrl?: string;
  tokenStorageType?: StorageType;
  tokenRetriever?: TokenRetreiver<TLoginResponse>;
}

const defaultProps = {
  loginUrl: '/auth/login',
  tokenStorageType: StorageType.LocalStorage,
  tokenRetriever: (token: any) => token.toString()
}

export interface AuthHook<TLoginViewModel = DefaultLoginViewModel> {
  token?: string;
  isLoggedIn: boolean;
  login: (loginDetails: TLoginViewModel) => Promise<void>;
  logout: () => void;
}

export const useAuth = <TLoginViewModel = DefaultLoginViewModel, TLoginResponse = string>(props: AuthHookProps<TLoginResponse>): AuthHook<TLoginViewModel> => {
  const {
    tokenStorageType,
    loginUrl,
    tokenRetriever,
    ...httpProps
  } = {...defaultProps, ...props};

  const http = useHttp(httpProps);
  const [token, setToken] = useStorage<string>({field: 'token', storageType: tokenStorageType})

  const login = (loginDetails: TLoginViewModel) =>
    http.post<TLoginResponse, TLoginViewModel>(loginUrl, loginDetails)
      .then(tokenRetriever)
      .then(setToken);

  const logout = () =>
    setToken(undefined);

  return {
    token,
    isLoggedIn: !!token,
    login,
    logout
  };
};