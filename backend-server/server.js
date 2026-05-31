// Load environment variables from a .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URLS = (
  process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:3000,http://localhost:3001'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client();

// Middleware
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || FRONTEND_URLS.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json()); // Parses incoming JSON payloads

// Test Route
app.get('/', (req, res) => {
  res.json({ message: "Backend server is running successfully!" });
});

app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body || {};

  if (!GOOGLE_CLIENT_ID) {
    return res.status(500).json({
      error: 'GOOGLE_CLIENT_ID is not configured on the server.',
    });
  }

  if (!token) {
    return res.status(400).json({
      error: 'Google credential token is required.',
    });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email_verified || !payload.email) {
      return res.status(401).json({
        error: 'Google account email is not verified.',
      });
    }

    // Upsert user in MongoDB
    const dbUser = await User.findOneAndUpdate(
      { googleId: payload.sub },
      {
        googleId: payload.sub,
        name: payload.name || '',
        email: payload.email,
        picture: payload.picture || '',
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      message: 'Google login successful.',
      user: {
        id: dbUser.googleId,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.picture,
      },
    });
  } catch (error) {
    console.error('Google token verification failed:', error.message);
    return res.status(401).json({
      error: 'Invalid or expired Google token.',
    });
  }
});

// Connect to MongoDB then start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });