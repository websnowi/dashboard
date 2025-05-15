
import React from 'react';
import { useToolContext } from '@/context/ToolContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const ToolsList: React.FC = () => {
  const { 
    getPendingTools, 
    getApprovedTools,
    deleteTool 
  } = useToolContext();
  
  const pendingTools = getPendingTools();
  const approvedTools = getApprovedTools();

  const handleDeleteTool = (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this tool?');
    if (confirmDelete) {
      deleteTool(id);
    }
  };

  const ToolCard = ({ 
    id, 
    name, 
    description, 
    link, 
    imageUrl, 
    status 
  }: { 
    id: string;
    name: string;
    description: string;
    link: string;
    imageUrl: string;
    status: 'pending' | 'approved';
  }) => (
    <Card className="overflow-hidden h-full">
      <div className="relative h-48 w-full">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover" 
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">{description}</p>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-dashboard-primary hover:underline text-sm inline-block mb-3"
        >
          Visit Tool
        </a>
        
        {status === 'pending' && (
          <div className="flex space-x-2 mt-2">
            <Button 
              size="sm" 
              variant="outline"
              className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
              onClick={() => handleDeleteTool(id)}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Tabs defaultValue="pending" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="pending">Pending Review ({pendingTools.length})</TabsTrigger>
        <TabsTrigger value="approved">Approved ({approvedTools.length})</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pending">
        {pendingTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingTools.map(tool => (
              <ToolCard 
                key={tool.id} 
                id={tool.id}
                name={tool.name}
                description={tool.description}
                link={tool.link}
                imageUrl={tool.imageUrl}
                status="pending"
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No pending tools to review.</p>
          </Card>
        )}
      </TabsContent>
      
      <TabsContent value="approved">
        {approvedTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedTools.map(tool => (
              <ToolCard 
                key={tool.id}
                id={tool.id}
                name={tool.name}
                description={tool.description}
                link={tool.link}
                imageUrl={tool.imageUrl}
                status="approved" 
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No approved tools yet.</p>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ToolsList;
