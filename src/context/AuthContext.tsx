import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback,
  ReactNode,
  FC 
} from 'react';
import { 
  authAPI, 
  clearAuthStorage 
} from '@/services/api';
import { 
  User, 
  LoginRequest, 
  ApiError,
  AuthState 
} from '@/types';

/**
 * Auth Context Type Definition
 */
interface IAuthContext extends AuthState {
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

/**
 * Create Auth Context with default undefined
 */
const AuthContext = createContext<IAuthContext | undefined>(undefined);

/**
 * Auth Provider Props
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider Component
 * Manages authentication state and provides auth methods to the app
 */
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    tokens: null,
    isLoading: true,
    error: null,
  });

  /**
   * Initialize auth state on mount
   * Check if user has valid token in storage
   */
  useEffect(() => {
    const initializeAuth = (): void => {
      try {
        const isAuthenticated = authAPI.isAuthenticated();
        
        if (isAuthenticated) {
          const currentUser = authAPI.getCurrentUser();
          const token = authAPI.getToken();

          if (currentUser && token) {
            setState((prev) => ({
              ...prev,
              user: currentUser,
              tokens: { accessToken: token },
              isLoading: false,
            }));
          } else {
            // Invalid state - clear storage
            clearAuthStorage();
            setState((prev) => ({ ...prev, isLoading: false }));
          }
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        clearAuthStorage();
        setState((prev) => ({
          ...prev,
          error: error instanceof ApiError ? error : null,
          isLoading: false,
        }));
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login handler
   * @param credentials - User login credentials
   */
  const login = useCallback(async (credentials: LoginRequest): Promise<void> => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await authAPI.login(credentials);

      setState((prev) => ({
        ...prev,
        user: response.user,
        tokens: {
          accessToken: response.token,
          expiresIn: response.expiresIn,
        },
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const apiError = error instanceof ApiError 
        ? error 
        : new ApiError(500, 'LOGIN_ERROR', 'Login failed');

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: apiError,
        user: null,
        tokens: null,
      }));

      throw apiError;
    }
  }, []);

  /**
   * Logout handler
   * Clears auth state and storage
   */
  const logout = useCallback((): void => {
    try {
      authAPI.logout();
      setState({
        user: null,
        tokens: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Force clear state even if logout API call fails
      setState({
        user: null,
        tokens: null,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback((): void => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  /**
   * Context value
   */
  const value: IAuthContext = {
    user: state.user,
    tokens: state.tokens,
    isLoading: state.isLoading,
    error: state.error,
    isAuthenticated: !!state.user,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use Auth Context
 * @returns Auth context with all authentication state and methods
 * @throws Error if used outside AuthProvider
 */
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error(
      'useAuth hook must be used within an AuthProvider component. ' +
      'Make sure your component is wrapped with <AuthProvider>'
    );
  }
  
  return context;
};

/**
 * Hook to get only user data
 * Useful for components that only need user info
 */
export const useAuthUser = (): User | null => {
  const { user } = useAuth();
  return user;
};

/**
 * Hook to get only auth status
 * Useful for components that only need to know if user is authenticated
 */
export const useIsAuthenticated = (): boolean => {
  const { user } = useAuth();
  return !!user;
};

