import { createClient } from '@supabase/supabase-js';

// Use your Supabase project URL and anon key here
const supabaseUrl = 'https://mbrkdaoavmpnjpkaerzu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1icmtkYW9hdm1wbmpwa2Flcnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzODIzMzQsImV4cCI6MjA2NDk1ODMzNH0.RVA_NaR2eh0W4hHhSdXi8_1hDMZLPNCmz3hwv4U-u4o';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const newTool = req.body;

    // Insert the new tool into your Supabase 'tools' table
    const { data, error } = await supabase
      .from('tools')
      .insert([newTool]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ message: 'Failed to insert tool' });
    }

    return res.status(200).json({ message: 'Tool added successfully', data });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}
