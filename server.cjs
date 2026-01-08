// Simple Node.js Express server for image upload proxy to imgbb
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');

const app = express();
const upload = multer();
app.use(cors());

const IMGBB_API_KEY = '60d8de76b8915722cd93bb36faa4dcca'; // Your imgbb API key

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
    // Convert buffer to base64
    const base64Image = req.file.buffer.toString('base64');
    // Send to imgbb
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      new URLSearchParams({ image: base64Image }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    res.json({ url: response.data.data.url });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});

app.listen(4000, () => {
  console.log('Image upload proxy running on http://localhost:4000');
});
