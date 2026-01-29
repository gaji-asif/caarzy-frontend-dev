import axios, { 
  AxiosInstance, 
  AxiosError, 
  InternalAxiosRequestConfig,
  AxiosResponse 
} from 'axios';
import { 
  LoginRequest, 
  LoginResponse, 
  ApiError,
  ApiErrorResponse,
  User
} from '@/types';

/**
 * API Configuration Constants
 * Read from environment variables with fallback defaults for development
 */
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),
  RETRY_ATTEMPTS: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || '3', 10),
  RETRY_DELAY: parseInt(import.meta.env.VITE_API_RETRY_DELAY || '1000', 10),
} as const;

const TOKEN_STORAGE_KEY = 'authToken';
const USER_STORAGE_KEY = 'user';

/**
 * Create Axios instance with default configuration
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request Interceptor - Add Auth Token
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getStoredToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor - Handle Errors
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ApiErrorResponse>) => {
      const apiError = handleAxiosError(error);

      // Auto-logout on unauthorized
      if (apiError.isUnauthorized()) {
        clearAuthStorage();
        window.location.href = '/login';
      }

      return Promise.reject(apiError);
    }
  );

  return client;
};

/**
 * Convert Axios error to ApiError
 */
const handleAxiosError = (error: AxiosError<ApiErrorResponse>): ApiError => {
  const statusCode = error.response?.status ?? 500;
  const errorData = error.response?.data;
  const code = errorData?.code ?? 'UNKNOWN_ERROR';
  const message = errorData?.message ?? error.message ?? 'An error occurred';
  const details = errorData?.details;

  return new ApiError(statusCode, code, message, details);
};

/**
 * Local Storage Management
 */
const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to retrieve token from storage:', error);
    return null;
  }
};

const getStoredUser = (): User | null => {
  try {
    const userStr = localStorage.getItem(USER_STORAGE_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.warn('Failed to retrieve user from storage:', error);
    return null;
  }
};

const setAuthStorage = (token: string, user: User): void => {
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.warn('Failed to store auth data:', error);
  }
};

export const clearAuthStorage = (): void => {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear auth storage:', error);
  }
};

/**
 * Public API - Authentication
 */
export const authAPI = {
  /**
   * Login with email/username and password
   * @param credentials - Login credentials
   * @returns Promise with login response
   * @throws ApiError - If login fails
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    if (!credentials.email && !credentials.username) {
      throw new ApiError(
        422,
        'VALIDATION_ERROR',
        'Email or username is required'
      );
    }

    if (!credentials.password) {
      throw new ApiError(
        422,
        'VALIDATION_ERROR',
        'Password is required'
      );
    }

    try {
      const response = await apiClient.post('api/login', credentials);

      // Backend may return a shape like:
      // {
      //   success: true,
      //   message: 'User logged in Successfully',
      //   data: { ...user },
      //   token: '...'
      //   token_type: 'Bearer'
      // }

      const raw = response.data as any;

      const token: string | undefined = raw.token || raw.access_token || raw.data?.token;
      const tokenType: string | undefined = raw.token_type || raw.tokenType || raw.type;
      const user: User | undefined = raw.data ?? raw.user ?? raw;

      if (!token || !user) {
        throw new ApiError(500, 'INVALID_RESPONSE', 'Invalid server response');
      }

      // Store authentication data
      setAuthStorage(token, user as User);

      // Return a normalized response shape
      const normalized: LoginResponse = {
        token,
        token_type: tokenType,
        user: user as User,
        success: raw.success,
        message: raw.message,
      };

      return normalized;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw handleAxiosError(error as AxiosError<ApiErrorResponse>);
    }
  },

  /**
   * Logout current user
   */
  logout(): void {
    clearAuthStorage();
  },

  /**
   * Get current stored user
   */
  getCurrentUser(): User | null {
    return getStoredUser();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!getStoredToken();
  },

  /**
   * Get current auth token
   */
  getToken(): string | null {
    return getStoredToken();
  },
};

/**
 * Initialize API client
 */
const apiClient = createApiClient();

export default apiClient;

