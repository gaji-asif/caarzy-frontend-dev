import { FC } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import CarCondition from "./pages/CarCondition";
import PriceRange from "./pages/PriceRange";
import FuelType from "./pages/FuelType";
import CarBrand from "./pages/CarBrand";
import SearchResults from "./pages/SearchResults";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

/**
 * Create Query Client instance
 * Used for server state management with React Query
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
    },
  },
});

/**
 * Main App Component
 * Provides all necessary providers and routes
 */
const App: FC = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes */}
              <Route path="/" element={<Index /> }/>
              <Route path="/car-condition" element={<ProtectedRoute><CarCondition /></ProtectedRoute>} />
              <Route path="/price-range" element={<ProtectedRoute><PriceRange /></ProtectedRoute>} />
              <Route path="/fuel-type" element={<ProtectedRoute><FuelType /></ProtectedRoute>} />
              <Route path="/car-brand" element={<ProtectedRoute><CarBrand /></ProtectedRoute>} />
              <Route path="/search-results" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
              
              {/* Catch-all route - 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

