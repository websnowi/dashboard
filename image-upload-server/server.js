const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = 'websnowi/dashboard'; // Replace with your actual repo
const BRANCH = 'main';

app.post('/upload', upload.single('image'), async (req, res) => {
  const file = fs.readFileSync(req.file.path);
  const base64 = file.toString('base64');
  const fileName = req.file.originalname;

  try {
    const response = await axios.put(
      `https://api.github.com/repos/${REPO}/contents/uploads/${fileName}`,
      {
        message: `Upload ${fileName}`,
        content: base64,
        branch: BRANCH,
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    fs.unlinkSync(req.file.path);
    res.json({ url: response.data.content.download_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('Server started on port 3001'));
