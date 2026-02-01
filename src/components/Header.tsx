import { FC, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ChevronDown, User, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useToastConfig } from "@/hooks/useToastConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

/**
 * Header Component
 * Displays site branding, language selector, and user menu
 */
const Header: FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { duration: toastDuration } = useToastConfig();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  /**
   * Handle logout action
   */
  const handleLogout = useCallback((): void => {
    try {
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
        duration: toastDuration,
      });

      // Redirect to login page
      navigate("/login", { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      
      toast({
        title: 'Logout error',
        description: 'An error occurred while logging out.',
        variant: 'destructive',
        duration: toastDuration,
      });
    }
  }, [navigate, toast, toastDuration]);

  /**
   * Get user display name
   */
  const getUserDisplayName = (): string => {
    return user?.name || user?.email || user?.username || 'User';
  };

  /**
   * Get user email or username for secondary display
   */
  const getUserSecondaryInfo = (): string => {
    return user?.email || user?.username || '';
  };

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Subtitle */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
              <span className="text-foreground">Caa</span>
              <span className="text-primary">rzy</span>
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm font-medium">
              Your All-in-One Car Marketplace
            </p>
          </div>

          {/* Right Side - Language & User Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium hidden sm:inline">English</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem className="cursor-pointer">
                  <span className="mr-2">🇺🇸</span> English
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <span className="mr-2">🇪🇸</span> Español
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <span className="mr-2">🇫🇷</span> Français
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <span className="mr-2">🇩🇪</span> Deutsch
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu - Only show if authenticated */}
            {isAuthenticated && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <User className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium hidden sm:inline truncate max-w-xs">
                      {getUserDisplayName()}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {/* User Info Section */}
                  <div className="px-2 py-2">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {getUserDisplayName()}
                    </p>
                    {getUserSecondaryInfo() && (
                      <p className="text-xs text-muted-foreground truncate">
                        {getUserSecondaryInfo()}
                      </p>
                    )}
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  {/* Logout Button */}
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

