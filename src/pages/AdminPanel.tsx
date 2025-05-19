
import React, { useState } from 'react';
import { useToolContext } from '@/context/ToolContext';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Database, 
  Users, 
  LayoutDashboard, 
  Check, 
  X, 
  Trash2 
} from 'lucide-react';
import { 
  Button,
  Card,
  Badge,
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

const AdminPanel: React.FC = () => {
  const { 
    getAllTools, 
    getPendingTools, 
    getApprovedTools, 
    getRejectedTools,
    approveTool, 
    rejectTool, 
    deleteTool,
    getUserActivity
  } = useToolContext();
  
  const allTools = getAllTools();
  const pendingTools = getPendingTools();
  const approvedTools = getApprovedTools();
  const rejectedTools = getRejectedTools();
  const activities = getUserActivity();

  const handleApprove = (id: string) => {
    approveTool(id);
  };

  const handleReject = (id: string) => {
    rejectTool(id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tool? This action cannot be undone.')) {
      deleteTool(id);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
    }
  };

  const ToolsTable = ({ tools }: { tools: any[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="w-[200px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tools.length > 0 ? (
          tools.map((tool) => (
            <TableRow key={tool.id}>
              <TableCell className="font-medium">{tool.name}</TableCell>
              <TableCell>{getStatusBadge(tool.status)}</TableCell>
              <TableCell>{tool.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {tool.status === 'pending' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-green-500 text-green-500 hover:bg-green-50"
                        onClick={() => handleApprove(tool.id)}
                      >
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleReject(tool.id)}
                      >
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-slate-500 text-slate-500 hover:bg-slate-50"
                    onClick={() => handleDelete(tool.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4 text-gray-500">
              No tools found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

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
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="tools">Tools Management</TabsTrigger>
              <TabsTrigger value="activity">User Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tools">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Tools Management</h2>
                <div className="mb-4">
                  <span className="mr-4">Total Tools: <strong>{allTools.length}</strong></span>
                  <span className="mr-4">Pending: <strong>{pendingTools.length}</strong></span>
                  <span className="mr-4">Approved: <strong>{approvedTools.length}</strong></span>
                  <span>Rejected: <strong>{rejectedTools.length}</strong></span>
                </div>
                
                <Tabs defaultValue="all" className="w-full">
                  <TabsList>
                    <TabsTrigger value="all">All Tools</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-4">
                    <ToolsTable tools={allTools} />
                  </TabsContent>
                  
                  <TabsContent value="pending" className="mt-4">
                    <ToolsTable tools={pendingTools} />
                  </TabsContent>
                  
                  <TabsContent value="approved" className="mt-4">
                    <ToolsTable tools={approvedTools} />
                  </TabsContent>
                  
                  <TabsContent value="rejected" className="mt-4">
                    <ToolsTable tools={rejectedTools} />
                  </TabsContent>
                </Tabs>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card className="p-6">
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
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
