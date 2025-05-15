
export interface AITool {
  id: string;
  name: string;
  description: string;
  link: string;
  imageUrl: string;
  status: 'pending' | 'approved';
  createdAt: Date;
  usageStats?: {
    [date: string]: number; // date string -> number of users
  };
}
