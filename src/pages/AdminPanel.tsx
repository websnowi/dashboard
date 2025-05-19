
import React, { useState, useEffect } from 'react';
import { useToolContext } from '@/context/ToolContext';
import { AdminDashboardLayout } from '@/components/admin/AdminDashboardLayout';
import { AdminToolsManagement } from '@/components/admin/AdminToolsManagement';
import { AdminUserActivity } from '@/components/admin/AdminUserActivity';
import { AdminUsersManagement } from '@/components/admin/AdminUsersManagement';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navigate } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Check authentication on component mount
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    setIsAuthenticated(!!adminToken);
  }, []);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }

  const handleSignOut = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="tools">Tools Management</TabsTrigger>
            <TabsTrigger value="users">Users Management</TabsTrigger>
            <TabsTrigger value="activity">User Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tools">
            <Card className="p-6">
              <AdminToolsManagement />
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card className="p-6">
              <AdminUsersManagement />
            </Card>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card className="p-6">
              <AdminUserActivity />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminPanel;
