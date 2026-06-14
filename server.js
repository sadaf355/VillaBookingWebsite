const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Serve static frontend assets from workspace root
app.use(express.static(__dirname));

// Ensure database tables are created on startup
db.initDb();

// ── JWT Verification Middleware ───────────────────────────────────────────
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required. Please log in first.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Session expired or invalid. Please log in again.' });
    }
    req.user = user;
    next();
  });
};

// ── Authentication API Routes ──────────────────────────────────────────────

// Register Route
app.post('/api/auth/register', async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;

  if (!first_name || !last_name || !email || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Check if user already exists
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into DB
    const result = await db.query(
      'INSERT INTO users (first_name, last_name, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, phone',
      [first_name, last_name, email, phone, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully!', user: result.rows[0] });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Check if user exists
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'User not registered. Please register first.' });
    }

    const user = result.rows[0];

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// ── Bookings API Route (Protected) ────────────────────────────────────────

app.post('/api/bookings', authenticateToken, async (req, res) => {
  const { full_name, email, phone, checkin_date, checkout_date, gender, package_type, total_amount, message } = req.body;

  if (!full_name || !email || !phone || !checkin_date || !checkout_date || !gender || !package_type || !total_amount) {
    return res.status(400).json({ error: 'All required booking fields must be completed.' });
  }

  try {
    const result = await db.query(
      `INSERT INTO bookings 
      (user_id, full_name, email, phone, checkin_date, checkout_date, gender, package_type, total_amount, message) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING *`,
      [req.user.id, full_name, email, phone, checkin_date, checkout_date, gender, package_type, total_amount, message]
    );

    res.status(201).json({ message: 'Staycation booking created successfully!', booking: result.rows[0] });
  } catch (error) {
    console.error('Error during booking storage:', error.message);
    res.status(500).json({ error: 'Server error saving booking.' });
  }
});

// ── Contact Inquiry API Route (Open) ──────────────────────────────────────

app.post('/api/contact', async (req, res) => {
  const { full_name, email, phone, destination, num_guests, checkin_date, checkout_date, message } = req.body;

  if (!full_name || !email || !phone || !destination || !num_guests || !checkin_date || !checkout_date) {
    return res.status(400).json({ error: 'All required contact fields must be completed.' });
  }

  try {
    const result = await db.query(
      `INSERT INTO inquiries 
      (full_name, email, phone, destination, num_guests, checkin_date, checkout_date, message) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *`,
      [full_name, email, phone, destination, parseInt(num_guests), checkin_date, checkout_date, message]
    );

    res.status(201).json({ message: 'Contact inquiry saved successfully!', inquiry: result.rows[0] });
  } catch (error) {
    console.error('Error during inquiry storage:', error.message);
    res.status(500).json({ error: 'Server error saving inquiry.' });
  }
});

// Fallback to index.html for direct navigation handling
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
