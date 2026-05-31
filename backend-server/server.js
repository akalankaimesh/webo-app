// Load environment variables from a .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { promisify } = require('util');
const { OAuth2Client } = require('google-auth-library');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URLS = (
  process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:3000,http://localhost:3001'
)
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);
const FRONTEND_URL_SET = new Set(FRONTEND_URLS);
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client();
const scryptAsync = promisify(crypto.scrypt);

function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  const normalizedOrigin = String(origin).trim().replace(/\/$/, '');
  if (FRONTEND_URL_SET.has(normalizedOrigin)) {
    return true;
  }

  // Permit common local dev host variants without requiring env changes.
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(normalizedOrigin);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

function isValidMobile(mobile) {
  return /^\+?\d{7,15}$/.test(String(mobile || '').replace(/\s/g, ''));
}

function hasPasswordValue(password) {
  return Boolean(password && String(password).trim());
}

function formatUserForClient(user) {
  const hasPassword = hasPasswordValue(user.password);
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    picture: user.picture,
    mobile: user.mobile || '',
    verified: Boolean(user.verified),
    hasPassword,
    profileComplete: Boolean((user.mobile || '').trim()) && hasPassword,
  };
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = await scryptAsync(password, salt, 64);
  return `${salt}:${Buffer.from(derived).toString('hex')}`;
}

async function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) {
    return false;
  }

  const [salt, key] = storedHash.split(':');
  if (!salt || !key) {
    return false;
  }

  const derived = await scryptAsync(password, salt, 64);
  const storedKey = Buffer.from(key, 'hex');
  const derivedKey = Buffer.from(derived);

  if (storedKey.length !== derivedKey.length) {
    return false;
  }

  return crypto.timingSafeEqual(storedKey, derivedKey);
}

// Middleware
const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json()); // Parses incoming JSON payloads

// Test Route
app.get('/', (req, res) => {
  res.json({ message: "Backend server is running successfully!" });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, mobile, password, dob } = req.body || {};

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({
      error: 'Name, email, mobile and password are required.',
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  if (!isValidMobile(mobile)) {
    return res.status(400).json({ error: 'Invalid mobile number.' });
  }

  if (String(password).length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  }

  try {
    const existing = await User.findOne({ email: String(email).trim().toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const hashedPassword = await hashPassword(String(password));

    const dbUser = await User.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      mobile: String(mobile).trim(),
      password: hashedPassword,
      status: 'active',
      dob: dob ? new Date(dob) : null,
    });

    return res.status(201).json({
      message: 'Registration successful.',
      user: formatUserForClient(dbUser),
    });
  } catch (error) {
    console.error('Registration failed:', error.message);
    return res.status(500).json({ error: 'Failed to register user.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const dbUser = await User.findOne({ email: String(email).trim().toLowerCase() });
    if (!dbUser) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const validPassword = await verifyPassword(String(password), dbUser.password || '');
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    return res.status(200).json({
      message: 'Login successful.',
      user: formatUserForClient(dbUser),
    });
  } catch (error) {
    console.error('Login failed:', error.message);
    return res.status(500).json({ error: 'Failed to login user.' });
  }
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
      { email: payload.email },
      {
        googleId: payload.sub,
        name: payload.name || '',
        email: payload.email,
        picture: payload.picture || '',
      },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      message: 'Google login successful.',
      user: formatUserForClient(dbUser),
    });
  } catch (error) {
    console.error('Google token verification failed:', error.message);
    return res.status(401).json({
      error: 'Invalid or expired Google token.',
    });
  }
});

app.get('/api/auth/user-details', async (req, res) => {
  const { email } = req.query || {};
  if (!email || !isValidEmail(String(email))) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }

  try {
    const dbUser = await User.findOne({ email: String(email).trim().toLowerCase() });
    if (!dbUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json({ user: formatUserForClient(dbUser) });
  } catch (error) {
    console.error('Fetch user details failed:', error.message);
    return res.status(500).json({ error: 'Failed to fetch user details.' });
  }
});

async function completeProfileHandler(req, res) {
  const { email, mobile, password } = req.body || {};

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Valid email is required.' });
  }

  const updateData = {};
  if (mobile !== undefined) {
    if (!isValidMobile(mobile)) {
      return res.status(400).json({ error: 'Invalid mobile number.' });
    }
    updateData.mobile = String(mobile).trim();
  }

  if (password !== undefined) {
    if (String(password).length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }
    updateData.password = await hashPassword(String(password));
  }

  if (!Object.keys(updateData).length) {
    return res.status(400).json({ error: 'No profile fields provided for update.' });
  }

  try {
    const dbUser = await User.findOneAndUpdate(
      { email: String(email).trim().toLowerCase() },
      updateData,
      { returnDocument: 'after' }
    );

    if (!dbUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json({
      message: 'Profile updated successfully.',
      user: formatUserForClient(dbUser),
    });
  } catch (error) {
    console.error('Complete profile failed:', error.message);
    return res.status(500).json({ error: 'Failed to update profile.' });
  }
}

app.patch('/api/auth/complete-profile', completeProfileHandler);
app.post('/api/auth/complete-profile', completeProfileHandler);

app.use((err, req, res, next) => {
  if (err && typeof err.message === 'string' && err.message.startsWith('Not allowed by CORS')) {
    return res.status(403).json({ error: err.message });
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON payload.' });
  }

  return next(err);
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