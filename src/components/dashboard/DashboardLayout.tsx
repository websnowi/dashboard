
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart2, 
  Home, 
  LogOut, 
  Menu, 
  X, 
  Megaphone 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: 'home' | 'analytics' | 'ads';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  currentPage 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    { name: 'Ads', icon: Megaphone, path: '/ads' },
  ];

  const handleSignOut = () => {
    // In a real app, you would handle authentication logout here
    console.log("Signing out...");
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-dashboard-background">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed md:sticky top-0 left-0 z-40 h-screen w-64 transform transition-transform duration-300 ease-in-out",
          "bg-sidebar text-sidebar-foreground flex flex-col",
          isMobile && !sidebarOpen && "-translate-x-full",
          isMobile && sidebarOpen && "translate-x-0",
          !isMobile && "translate-x-0"
        )}
      >
        {/* Logo area */}
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-white">AI Tools Admin</h1>
        </div>

        {/* Navigation links */}
        <div className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            {navItems.map(item => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "w-full justify-start px-4 py-6 text-lg",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  currentPage === item.name.toLowerCase() && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setSidebarOpen(false);
                }}
              >
                <item.icon className="mr-4 h-5 w-5" />
                {item.name}
              </Button>
            ))}
          </nav>
        </div>

        {/* Sign out button */}
        <div className="px-4 py-6 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-6 text-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={handleSignOut}
          >
            <LogOut className="mr-4 h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
