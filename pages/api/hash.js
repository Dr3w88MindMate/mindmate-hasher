// ✅ Declare once, at the top
const crypto = require('crypto');

// 🌐 Main API handler
export default function handler(req, res) {
  // ✅ Check HTTP method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 🔐 Verify API key in header
  const apiKey = req.headers['x-api-key'];
  const expectedKey = process.env.API_KEY;

  if (!apiKey || apiKey !== expectedKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // ✅ Validate request body
  const { value } = req.body;
  if (!value || typeof value !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid value' });
  }

  // 🧼 Clean phone number: remove all non-digits
  const cleaned = value.replace(/\D/g, '');

  // 🔐 Apply static salt from env
  const salt = process.env.SALT || '';
  const saltedInput = salt + cleaned;

  // 🔁 Generate SHA-256 hash
  const hash = crypto.createHash('sha256').update(saltedInput).digest('hex');

  // 📦 Return hashed result
  return res.status(200).json({ hash });
}
