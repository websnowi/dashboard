
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, UserCheck, UserX, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Mock user data
const mockUsers = [
  { id: '1', username: 'john_doe', email: 'john@example.com', status: 'active', createdAt: new Date('2024-04-15') },
  { id: '2', username: 'jane_smith', email: 'jane@example.com', status: 'active', createdAt: new Date('2024-04-10') },
  { id: '3', username: 'bob_johnson', email: 'bob@example.com', status: 'inactive', createdAt: new Date('2024-04-05') },
  { id: '4', username: 'alice_williams', email: 'alice@example.com', status: 'active', createdAt: new Date('2024-04-01') },
  { id: '5', username: 'mike_brown', email: 'mike@example.com', status: 'inactive', createdAt: new Date('2024-03-25') },
];

export const AdminUsersManagement: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);

  const handleDeactivateUser = (id: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, status: 'inactive' } : user
      )
    );
    toast.success('User deactivated successfully');
  };

  const handleActivateUser = (id: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, status: 'active' } : user
      )
    );
    toast.success('User activated successfully');
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      toast.success('User deleted successfully');
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
      : <Badge className="bg-red-500 hover:bg-red-600">Inactive</Badge>;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users Management</h2>
      <div className="mb-4">
        <span className="mr-4">Total Users: <strong>{users.length}</strong></span>
        <span className="mr-4">Active: <strong>{users.filter(u => u.status === 'active').length}</strong></span>
        <span>Inactive: <strong>{users.filter(u => u.status === 'inactive').length}</strong></span>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined On</TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-slate-500" />
                    {user.username}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {user.status === 'active' ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-amber-500 text-amber-500 hover:bg-amber-50"
                        onClick={() => handleDeactivateUser(user.id)}
                      >
                        <UserX className="h-4 w-4 mr-1" /> Deactivate
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-green-500 text-green-500 hover:bg-green-50"
                        onClick={() => handleActivateUser(user.id)}
                      >
                        <UserCheck className="h-4 w-4 mr-1" /> Activate
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-slate-500 text-slate-500 hover:bg-slate-50"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
