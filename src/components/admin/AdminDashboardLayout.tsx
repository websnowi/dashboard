
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Database, Users, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  onSignOut?: () => void;
}

export const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ 
  children, 
  onSignOut 
}) => {
  // In a real app, this would come from a context or API
  const adminName = "Super Admin";
  
  return (
    <div className="min-h-screen flex">
      {/* Admin Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        
        <div className="flex-1 overflow-auto py-4 space-y-2">
          <div className="px-4 py-2">
            <h3 className="text-xs uppercase text-slate-400 font-medium mb-2">Management</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/admin" className="flex items-center px-3 py-2 text-slate-200 rounded-md hover:bg-slate-800">
                  <Shield className="mr-2 h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className="flex items-center px-3 py-2 text-slate-200 rounded-md hover:bg-slate-800">
                  <Database className="mr-2 h-5 w-5" />
                  <span>Tools</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className="flex items-center px-3 py-2 text-slate-200 rounded-md hover:bg-slate-800">
                  <Users className="mr-2 h-5 w-5" />
                  <span>Users</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {adminName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{adminName}</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-400 hover:text-white hover:bg-slate-800"
              onClick={onSignOut}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          
          <Link to="/">
            <Button variant="outline" className="w-full bg-slate-800 hover:bg-slate-700 text-white border-slate-700">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Back to Main App
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 bg-slate-50">
        {children}
      </div>
    </div>
  );
};
