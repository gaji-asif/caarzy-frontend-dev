import { useState, useCallback, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useFormValidation, validators, combineValidators } from '@/hooks/useFormValidation';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { LoginRequest, ApiError } from '@/types';

/**
 * Login Form Data Type
 */
interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Login Page Component
 */
const Login: FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error: authError } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  // Form validation setup
  const { errors, validateAll, clearErrors, clearFieldError } = useFormValidation<LoginFormData>({
    email: validators.email,
    password: combineValidators(
      validators.required('Password'),
      validators.minLength(6)
    ),
  });

  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  // Clear auth error when user starts typing
  useEffect(() => {
    if (authError) {
      clearErrors();
    }
  }, [authError, clearErrors]);

  /**
   * Handle input change
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = e.target;
      
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear field error when user starts typing
      if (errors[name]) {
        clearFieldError(name);
      }
    },
    [errors, clearFieldError]
  );

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      // Validate form
      const validation = validateAll(formData);
      if (!validation.isValid) {
        return;
      }

      try {
        // Prepare login credentials
        const credentials: LoginRequest = {
          email: formData.email,
          password: formData.password,
        };

        // Perform login
        await login(credentials);

        // Show success message
        toast({
          title: 'Login successful',
          description: 'Welcome back to Caarzy. Redirecting...',
        });

        // Redirect to home page
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 500);
      } catch (error) {
        // Error is already handled by AuthContext
        // Just ensure error message is shown
        if (error instanceof ApiError) {
          toast({
            title: 'Login failed',
            description: error.message,
            variant: 'destructive',
          });
        }
      }
    },
    [formData, login, navigate, toast, validateAll]
  );

  /**
   * Render email input field
   */
  const renderEmailField = (): JSX.Element => (
    <div className="space-y-2">
      <label htmlFor="email" className="block text-sm font-medium text-foreground">
        Email Address
      </label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className={`pl-10 transition-colors ${
            errors.email 
              ? 'border-destructive focus-visible:ring-destructive' 
              : ''
          }`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
      </div>
      {errors.email && (
        <p id="email-error" className="text-sm text-destructive font-medium">
          {errors.email}
        </p>
      )}
    </div>
  );

  /**
   * Render password input field
   */
  const renderPasswordField = (): JSX.Element => (
    <div className="space-y-2">
      <label htmlFor="password" className="block text-sm font-medium text-foreground">
        Password
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          className={`pl-10 pr-10 transition-colors ${
            errors.password 
              ? 'border-destructive focus-visible:ring-destructive' 
              : ''
          }`}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
      {errors.password && (
        <p id="password-error" className="text-sm text-destructive font-medium">
          {errors.password}
        </p>
      )}
    </div>
  );

  /**
   * Render auth error alert
   */
  const renderAuthError = (): JSX.Element | null => {
    if (!authError) return null;

    return (
      <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
        <p className="text-sm text-destructive font-medium">
          {authError.message}
        </p>
        {authError.details && Object.keys(authError.details).length > 0 && (
          <details className="mt-2 text-xs text-destructive/80">
            <summary className="cursor-pointer font-medium">Details</summary>
            <pre className="mt-1 p-2 bg-destructive/5 rounded text-left overflow-auto">
              {JSON.stringify(authError.details, null, 2)}
            </pre>
          </details>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
              <span className="text-foreground">Caa</span>
              <span className="text-primary">rzy</span>
            </h1>
          </div>

          {/* Title and Description */}
          <CardTitle className="text-2xl font-heading">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Auth Error Alert */}
            {renderAuthError()}

            {/* Email Field */}
            {renderEmailField()}

            {/* Password Field */}
            {renderPasswordField()}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || Object.keys(errors).length > 0}
              className="w-full mt-6 h-10 font-medium"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

