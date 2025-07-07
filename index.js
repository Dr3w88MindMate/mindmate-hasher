const express = require('express');
const crypto = require('crypto');

const app = express();

app.use(express.json());

app.post('/api/hash', (req, res) => {
  const { value } = req.body;

  if (!value || typeof value !== 'string') {
    res.status(400).json({ error: 'Missing or invalid value' });
    return;
  }

  const hash = crypto.createHash('sha256').update(value).digest('hex');
  res.status(200).json({ hash });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});