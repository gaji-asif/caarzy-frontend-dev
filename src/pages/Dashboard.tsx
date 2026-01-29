import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Search, BookmarkIcon, Settings, TrendingUp, Eye } from "lucide-react";

interface DashboardStats {
  savedSearches: number;
  viewedListings: number;
  watchlistItems: number;
  alerts: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats>({
    savedSearches: 3,
    viewedListings: 12,
    watchlistItems: 5,
    alerts: 2,
  });

  useEffect(() => {
    // Check if user is authenticated with a small delay
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userStr = localStorage.getItem('user');
      
      console.log('Dashboard: Checking token:', token);
      if (token) {
        console.log('Dashboard: Token found, user authenticated');
        setIsAuthenticated(true);
        
        if (userStr) {
          try {
            const userData = JSON.parse(userStr);
            setUser(userData);
          } catch (error) {
            console.error('Failed to parse user data:', error);
          }
        }
      } else {
        console.log('Dashboard: No token found, redirecting to login');
        navigate('/login');
      }
    };

    // Small delay to ensure token is set from login
    const timer = setTimeout(checkAuth, 200);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        {/* Welcome Section */}
        <section className="py-8 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                Welcome back, {user?.name || user?.email || 'User'}! 👋
              </h1>
              <p className="text-muted-foreground text-lg">
                Here's what's happening with your car search journey
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Stat Card 1 */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">Saved Searches</CardTitle>
                      <Search className="w-5 h-5 text-primary opacity-70" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.savedSearches}</div>
                    <p className="text-xs text-muted-foreground mt-1">Active searches</p>
                  </CardContent>
                </Card>

                {/* Stat Card 2 */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">Viewed Listings</CardTitle>
                      <Eye className="w-5 h-5 text-blue-500 opacity-70" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.viewedListings}</div>
                    <p className="text-xs text-muted-foreground mt-1">Cars viewed</p>
                  </CardContent>
                </Card>

                {/* Stat Card 3 */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">Watchlist</CardTitle>
                      <BookmarkIcon className="w-5 h-5 text-amber-500 opacity-70" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.watchlistItems}</div>
                    <p className="text-xs text-muted-foreground mt-1">Saved listings</p>
                  </CardContent>
                </Card>

                {/* Stat Card 4 */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">New Alerts</CardTitle>
                      <Activity className="w-5 h-5 text-green-500 opacity-70" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.alerts}</div>
                    <p className="text-xs text-muted-foreground mt-1">Price drops & new cars</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Quick Actions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Search Cars Card */}
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/car-condition')}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-primary" />
                      Search Cars
                    </CardTitle>
                    <CardDescription>
                      Start a new car search with your preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      Start Searching
                    </Button>
                  </CardContent>
                </Card>

                {/* Saved Searches Card */}
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/search-results')}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookmarkIcon className="w-5 h-5 text-amber-500" />
                      Saved Searches
                    </CardTitle>
                    <CardDescription>
                      View your previously saved car searches
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      View {stats.savedSearches} Searches
                    </Button>
                  </CardContent>
                </Card>

                {/* Account Settings Card */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-blue-500" />
                      Account Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" disabled>
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="py-8 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>

              <Card>
                <CardHeader>
                  <CardTitle>Latest Updates</CardTitle>
                  <CardDescription>Your recent search and activity history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Activity Item 1 */}
                    <div className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Viewed Honda Civic 2022</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>

                    {/* Activity Item 2 */}
                    <div className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Price drop alert: Toyota Camry 2023 - $500 off</p>
                        <p className="text-xs text-muted-foreground">4 hours ago</p>
                      </div>
                    </div>

                    {/* Activity Item 3 */}
                    <div className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Added Mazda3 to your watchlist</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>

                    {/* Activity Item 4 */}
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Saved search: SUVs under $30k</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;