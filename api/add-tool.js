import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://mbrkdaoavmpnjpkaerzu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1icmtkYW9hdm1wbmpwa2Flcnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzODIzMzQsImV4cCI6MjA2NDk1ODMzNH0.RVA_NaR2eh0W4hHhSdXi8_1hDMZLPNCmz3hwv4U-u4o'
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { name, description, link, imageUrl, status } = req.body;

  const { data, error } = await supabase.from('tools').insert([
    {
      name,
      description,
      link,
      imageUrl,
      status: status || 'pending',
    }
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: 'Tool saved!', tool: data[0] });
}
