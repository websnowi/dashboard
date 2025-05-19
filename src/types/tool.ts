
export type ToolStatus = 'pending' | 'approved' | 'rejected';

export interface AITool {
  id: string;
  name: string;
  description: string;
  link: string;
  imageUrl: string;
  status: ToolStatus;
  createdAt: Date;
  category?: string;
  usageStats?: Record<string, number>;
}

export interface UsageData {
  name: string;
  value: number;
}
