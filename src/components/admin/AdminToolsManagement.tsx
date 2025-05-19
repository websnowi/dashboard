
import React, { useState } from 'react';
import { useToolContext } from '@/context/ToolContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check, X, Trash2 } from 'lucide-react';

export const AdminToolsManagement: React.FC = () => {
  const { 
    getAllTools, 
    getPendingTools, 
    getApprovedTools, 
    getRejectedTools,
    approveTool, 
    rejectTool, 
    deleteTool 
  } = useToolContext();
  
  const allTools = getAllTools();
  const pendingTools = getPendingTools();
  const approvedTools = getApprovedTools();
  const rejectedTools = getRejectedTools();

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
    <div>
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
    </div>
  );
};
