
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AddToolForm from '@/components/dashboard/AddToolForm';
import ToolsList from '@/components/dashboard/ToolsList';
import { ToolProvider } from '@/context/ToolContext';

const Index: React.FC = () => {
  return (
    <ToolProvider>
      <DashboardLayout currentPage="home">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Welcome to the AI Tools Dashboard. Add and manage tools for your website.
            </p>
          </div>
          
          <AddToolForm />
          
          <div className="pb-10">
            <h2 className="text-2xl font-semibold mb-6">Manage Tools</h2>
            <ToolsList />
          </div>
        </div>
      </DashboardLayout>
    </ToolProvider>
  );
};

export default Index;
