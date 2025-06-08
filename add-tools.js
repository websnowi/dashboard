import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const tool = req.body;

  if (!tool.name || !tool.description || !tool.link) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const filePath = path.join(process.cwd(), 'tools.json');

  try {
    // Read existing tools
    let tools = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      tools = JSON.parse(fileData);
    }

    // Add new tool with an id
    tool.id = Date.now().toString();
    tools.push(tool);

    // Save updated tools back to the file
    fs.writeFileSync(filePath, JSON.stringify(tools, null, 2));

    res.status(200).json({ message: 'Tool added successfully', tool });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
