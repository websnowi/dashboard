
import React from 'react';
import { useToolContext } from '@/context/ToolContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const AdminUserActivity: React.FC = () => {
  const { getUserActivity } = useToolContext();
  const activities = getUserActivity();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Activity</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{activity.username}</TableCell>
                <TableCell>{activity.action}</TableCell>
                <TableCell>{activity.timestamp.toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                No activity recorded.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
