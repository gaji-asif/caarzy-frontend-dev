import { useState, useCallback } from 'react';
import { FormValidationResult, FieldValidator } from '@/types';

/**
 * Custom Hook for Form Validation
 * Provides field validation with error tracking
 */
export const useFormValidation = <T extends Record<string, unknown>>(validators: Record<keyof T & string, FieldValidator>) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((fieldName: keyof T & string, value: unknown): boolean => {
    const validator = validators[fieldName as string];
    
    if (!validator) {
      return true;
    }

    const error = validator(String(value ?? ''));
    
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
      return false;
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
      return true;
    }
  }, [validators]);

  const validateAll = useCallback(
    (data: T): FormValidationResult => {
      const newErrors: Record<string, string> = {};

      Object.entries(data).forEach(([field, value]) => {
        const validator = validators[field as keyof T & string as string];
        if (validator) {
          const error = validator(String(value ?? ''));
          if (error) {
            newErrors[field] = error;
          }
        }
      });

      setErrors(newErrors);
      return {
        isValid: Object.keys(newErrors).length === 0,
        errors: newErrors,
      };
    },
    [validators]
  );

  const clearErrors = useCallback((): void => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((fieldName: string): void => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  return {
    errors,
    validateField,
    validateAll,
    clearErrors,
    clearFieldError,
    hasError: (fieldName: string): boolean => !!errors[fieldName],
    getError: (fieldName: string): string | undefined => errors[fieldName],
  };
};

/**
 * Predefined Validators
 */
export const validators = {
  email: (value: string): string | undefined => {
    if (!value.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  },

  username: (value: string): string | undefined => {
    if (!value.trim()) {
      return 'Username is required';
    }
    if (value.length < 3) {
      return 'Username must be at least 3 characters';
    }
    if (value.length > 20) {
      return 'Username must not exceed 20 characters';
    }
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(value)) {
      return 'Username can only contain letters, numbers, underscore and hyphen';
    }
    return undefined;
  },

  password: (value: string, minLength: number = 6): string | undefined => {
    if (!value) {
      return 'Password is required';
    }
    if (value.length < minLength) {
      return `Password must be at least ${minLength} characters`;
    }
    return undefined;
  },

  passwordStrength: (value: string): string | undefined => {
    if (!value) {
      return 'Password is required';
    }
    
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);

    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      return 'Password must contain uppercase, lowercase and numbers';
    }
    return undefined;
  },

  required: (fieldName: string = 'This field') => (value: string): string | undefined => {
    if (!value || !value.trim()) {
      return `${fieldName} is required`;
    }
    return undefined;
  },

  minLength: (minLength: number) => (value: string): string | undefined => {
    if (value.length < minLength) {
      return `Must be at least ${minLength} characters`;
    }
    return undefined;
  },

  maxLength: (maxLength: number) => (value: string): string | undefined => {
    if (value.length > maxLength) {
      return `Must not exceed ${maxLength} characters`;
    }
    return undefined;
  },

  phone: (value: string): string | undefined => {
    if (!value.trim()) {
      return 'Phone number is required';
    }
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return undefined;
  },
};

/**
 * Combine multiple validators into one
 */
export const combineValidators = (
  ...validatorFunctions: FieldValidator[]
): FieldValidator => {
  return (value: string): string | undefined => {
    for (const validator of validatorFunctions) {
      const error = validator(value);
      if (error) {
        return error;
      }
    }
    return undefined;
  };
};
