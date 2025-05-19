
import React, { createContext, useState, useContext, useEffect } from 'react';
import { AITool } from '@/types/tool';
import { toast } from 'sonner';

interface ToolContextType {
  tools: AITool[];
  addTool: (tool: Omit<AITool, 'id' | 'createdAt' | 'status'>) => void;
  approveTool: (id: string) => void;
  rejectTool: (id: string) => void;
  deleteTool: (id: string) => void;
  updateTool: (id: string, toolData: Partial<AITool>) => void;
  getToolById: (id: string) => AITool | undefined;
  getPendingTools: () => AITool[];
  getApprovedTools: () => AITool[];
  getRejectedTools: () => AITool[];
  getAllTools: () => AITool[];
  getUserActivity: () => { userId: string; username: string; action: string; timestamp: Date }[];
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

// Mock data for initial testing
const mockTools: AITool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'An advanced language model that can engage in conversations and provide detailed responses.',
    link: 'https://chat.openai.com',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop&q=60',
    status: 'approved',
    category: 'productivity',
    createdAt: new Date('2023-01-10'),
    usageStats: {
      '2024-05-10': 120,
      '2024-05-11': 145,
      '2024-05-12': 160,
      '2024-05-13': 130,
      '2024-05-14': 170,
      '2024-05-15': 190,
    }
  },
  {
    id: '2',
    name: 'DALL-E',
    description: 'An AI system that can create realistic images and art from natural language descriptions.',
    link: 'https://openai.com/dall-e',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60',
    status: 'approved',
    category: 'creativity',
    createdAt: new Date('2023-02-15'),
    usageStats: {
      '2024-05-10': 80,
      '2024-05-11': 95,
      '2024-05-12': 110,
      '2024-05-13': 105,
      '2024-05-14': 115,
      '2024-05-15': 125,
    }
  },
  {
    id: '3',
    name: 'Midjourney',
    description: 'An AI program that generates images from textual descriptions.',
    link: 'https://www.midjourney.com',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60',
    status: 'pending',
    category: 'creativity',
    createdAt: new Date('2023-03-20')
  },
];

// Mock user activity data
const mockUserActivity = [
  { userId: '1', username: 'John Doe', action: 'Added new tool: ChatGPT', timestamp: new Date('2024-05-15') },
  { userId: '2', username: 'Jane Smith', action: 'Updated tool: Midjourney', timestamp: new Date('2024-05-14') },
  { userId: '3', username: 'Bob Johnson', action: 'Deleted tool: Bard', timestamp: new Date('2024-05-13') },
];

export const ToolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tools, setTools] = useState<AITool[]>([]);

  // Load mock data initially
  useEffect(() => {
    // In a real app, you would fetch from an API here
    setTools(mockTools);
  }, []);

  const addTool = (toolData: Omit<AITool, 'id' | 'createdAt' | 'status'>) => {
    const newTool: AITool = {
      ...toolData,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'pending',
    };
    
    setTools(prevTools => [...prevTools, newTool]);
    toast.success('Tool submitted for review');
  };

  const approveTool = (id: string) => {
    setTools(prevTools =>
      prevTools.map(tool =>
        tool.id === id ? { ...tool, status: 'approved' } : tool
      )
    );
    toast.success('Tool approved successfully');
  };

  const rejectTool = (id: string) => {
    setTools(prevTools =>
      prevTools.map(tool =>
        tool.id === id ? { ...tool, status: 'rejected' } : tool
      )
    );
    toast.success('Tool rejected successfully');
  };

  const updateTool = (id: string, toolData: Partial<AITool>) => {
    setTools(prevTools =>
      prevTools.map(tool =>
        tool.id === id ? { ...tool, ...toolData } : tool
      )
    );
    toast.success('Tool updated successfully');
  };

  const deleteTool = (id: string) => {
    setTools(prevTools => prevTools.filter(tool => tool.id !== id));
    toast.success('Tool deleted successfully');
  };

  const getToolById = (id: string) => {
    return tools.find(tool => tool.id === id);
  };

  const getPendingTools = () => {
    return tools.filter(tool => tool.status === 'pending');
  };

  const getApprovedTools = () => {
    return tools.filter(tool => tool.status === 'approved');
  };

  const getRejectedTools = () => {
    return tools.filter(tool => tool.status === 'rejected');
  };

  const getAllTools = () => {
    return tools;
  };

  const getUserActivity = () => {
    // In a real app, this would fetch from a database
    return mockUserActivity;
  };

  return (
    <ToolContext.Provider value={{
      tools,
      addTool,
      approveTool,
      rejectTool,
      deleteTool,
      updateTool,
      getToolById,
      getPendingTools,
      getApprovedTools,
      getRejectedTools,
      getAllTools,
      getUserActivity
    }}>
      {children}
    </ToolContext.Provider>
  );
};

export const useToolContext = () => {
  const context = useContext(ToolContext);
  if (context === undefined) {
    throw new Error('useToolContext must be used within a ToolProvider');
  }
  return context;
};
