import { ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Protected Route Props
 */
interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Protected Route Component
 * Restricts access to authenticated users only
 * Redirects unauthenticated users to login page
 * Shows loading skeleton while checking authentication
 */
const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading skeleton while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-4xl px-4 space-y-4">
          {/* Header skeleton */}
          <Skeleton className="h-16 w-full rounded-lg" />
          
          {/* Content skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content
  return <>{children}</>;
};

export default ProtectedRoute;

