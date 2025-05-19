
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Database, Users, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AdminDashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
