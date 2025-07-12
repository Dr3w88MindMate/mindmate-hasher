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

  // Clean phone number: remove all non-digit characters (e.g. '+', spaces)
  const cleaned = value.replace(/\D/g, '');

  // 🔐 Use static salt from environment variable
  const salt = process.env.SALT || '';
  const saltedInput = salt + cleaned;

  const hash = crypto.createHash('sha256').update(saltedInput).digest('hex');
  res.status(200).json({ hash });
}