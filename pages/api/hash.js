// ✅ Declare once, at the top
const crypto = require('crypto');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { value } = req.body;

  if (!value || typeof value !== 'string') {
    res.status(400).json({ error: 'Missing or invalid value' });
    return;
  }

  // Remove all non-digit characters (including '+', spaces, etc.)
  const cleaned = value.replace(/\D/g, '');

  const hash = crypto.createHash('sha256').update(cleaned).digest('hex');
  res.status(200).json({ hash });
}
