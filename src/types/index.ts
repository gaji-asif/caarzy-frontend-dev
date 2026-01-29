/**
 * Shared Types and Interfaces
 * Centralized type definitions for the application
 */

// ============================================
// User Types
// ============================================

export interface User {
  id: string;
  email: string;
  username?: string;
  name?: string;
  avatar?: string;
  createdAt?: string;
}

export interface UserProfile extends User {
  phone?: string;
  address?: string;
  city?: string;
  role?: 'user' | 'seller' | 'admin';
}

// ============================================
// Authentication Types
// ============================================

export interface LoginRequest {
  email?: string;
  username?: string;
  password: string;
}

/**
 * Normalized Login Response used by the frontend after parsing
 * Accepts the backend's actual shape and exposes a consistent structure
 */
export interface LoginResponse {
  token: string;
  token_type?: string;
  user: User;
  success?: boolean;
  message?: string;
  expiresIn?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  error: ApiError | null;
}

// ============================================
// API Error Types
// ============================================

export interface ApiErrorResponse {
  message: string;
  code: string;
  details?: Record<string, unknown>;
  timestamp?: string;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  isUnauthorized(): boolean {
    return this.statusCode === 401;
  }

  isForbidden(): boolean {
    return this.statusCode === 403;
  }

  isNotFound(): boolean {
    return this.statusCode === 404;
  }

  isValidationError(): boolean {
    return this.statusCode === 422 || this.code === 'VALIDATION_ERROR';
  }
}

// ============================================
// Form Types
// ============================================

export interface FormError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export type FieldValidator = (value: string) => string | undefined;

// ============================================
// HTTP Types
// ============================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  timestamp: string;
}

// ============================================
// Car Types (for future use)
// ============================================

export interface Car {
  id: string;
  name: string;
  description: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  transmission: 'Manual' | 'Automatic';
  image: string;
  images?: string[];
  condition: 'New' | 'Used' | 'Reconditioned';
  vat: string;
}

export interface CarSearchFilters {
  brand?: string;
  priceMin?: number;
  priceMax?: number;
  condition?: string;
  fuelType?: string;
  yearMin?: number;
  yearMax?: number;
}
