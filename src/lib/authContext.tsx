import { JSX, createContext, createSignal, useContext } from 'solid-js';
import {
  Accessor,
  ContextProviderComponent,
} from 'solid-js/types/reactive/signal';

interface AuthProviderProps {
  authenticated?: boolean;
}

interface temp {
  login: VoidFunction;
  logout: VoidFunction;
}

type IAuthContext = [Accessor<boolean>, temp];

const AuthContext = createContext<IAuthContext>();

const AuthProvider: ContextProviderComponent<AuthProviderProps> = (props) => {
  const [authenticated, setAuthenticated] = createSignal(
    props.value.authenticated ?? false,
  );

  const context: IAuthContext = [
    authenticated,
    {
      login() {
        setAuthenticated(true);
      },
      logout() {
        localStorage.removeItem('token');
        setAuthenticated(false);
      },
    },
  ];

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext)!;

export { useAuth, AuthProvider };
