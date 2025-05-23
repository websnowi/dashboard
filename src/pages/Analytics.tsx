
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ToolAnalytics from '@/components/dashboard/ToolAnalytics';
import { ToolProvider } from '@/context/ToolContext';
import { UserProvider } from '@/context/UserContext';

const Analytics: React.FC = () => {
  return (
    <UserProvider>
      <ToolProvider>
        <DashboardLayout currentPage="analytics">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analytics</h1>
              <p className="text-gray-600">
                View detailed analytics for your AI tools.
              </p>
            </div>
            
            <ToolAnalytics />
          </div>
        </DashboardLayout>
      </ToolProvider>
    </UserProvider>
  );
};

export default Analytics;
