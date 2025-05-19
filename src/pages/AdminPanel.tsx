
import React, { useState } from 'react';
import { AdminDashboardLayout } from '@/components/admin/AdminDashboardLayout';
import { AdminToolsManagement } from '@/components/admin/AdminToolsManagement';
import { AdminUserActivity } from '@/components/admin/AdminUserActivity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const AdminPanel: React.FC = () => {
  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="tools">Tools Management</TabsTrigger>
            <TabsTrigger value="activity">User Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tools">
            <Card className="p-6">
              <AdminToolsManagement />
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
