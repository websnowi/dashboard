
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToolContext } from '@/context/ToolContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

type TimeRange = 'day' | 'week' | 'month';

const ToolAnalytics: React.FC = () => {
  const { getApprovedTools } = useToolContext();
  const approvedTools = getApprovedTools();
  const [selectedToolId, setSelectedToolId] = useState<string | null>(
    approvedTools.length > 0 ? approvedTools[0].id : null
  );
  const [timeRange, setTimeRange] = useState<TimeRange>('day');

  const selectedTool = approvedTools.find(tool => tool.id === selectedToolId);
  
  // Calculate total users
  const calculateTotalUsers = () => {
    if (!selectedTool?.usageStats) return 0;
    
    return Object.values(selectedTool.usageStats).reduce(
      (total, userCount) => total + userCount, 
      0
    );
  };

  // Prepare chart data
  const prepareChartData = () => {
    if (!selectedTool?.usageStats) return [];
    
    // For demonstration, we'll just use existing data
    // In a real app, you would filter by the selected time range
    return Object.entries(selectedTool.usageStats).map(([date, count]) => ({
      date: new Date(date).toLocaleDateString(),
      users: count,
    }));
  };

  return (
    <div className="space-y-8">
      <Card className="dashboard-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-2xl font-bold">Tool Analytics</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select 
                value={selectedToolId || undefined}
                onValueChange={(value) => setSelectedToolId(value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select a tool" />
                </SelectTrigger>
                <SelectContent>
                  {approvedTools.map((tool) => (
                    <SelectItem key={tool.id} value={tool.id}>
                      {tool.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={timeRange}
                onValueChange={(value) => setTimeRange(value as TimeRange)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {selectedTool ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">
                        Total Users
                      </p>
                      <h3 className="text-3xl font-bold mt-2">
                        {calculateTotalUsers().toLocaleString()}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">
                        Average Daily Users
                      </p>
                      <h3 className="text-3xl font-bold mt-2">
                        {Math.round(calculateTotalUsers() / 
                          (selectedTool.usageStats ? 
                            Object.keys(selectedTool.usageStats).length : 1)
                          ).toLocaleString()}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">
                        Peak Users
                      </p>
                      <h3 className="text-3xl font-bold mt-2">
                        {selectedTool.usageStats ? 
                          Math.max(...Object.values(selectedTool.usageStats)).toLocaleString() : 
                          '0'}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={prepareChartData()}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#6E59A5" name="Users" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                {approvedTools.length === 0 ? 
                  'No approved tools to show analytics for.' : 
                  'Select a tool to view analytics.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolAnalytics;
