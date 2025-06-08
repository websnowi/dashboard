export default function handler(req, res) {
  if (req.method === 'POST') {
    // This just confirms the API works
    res.status(200).json({ message: 'Tool received!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
