const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL successfully.');
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL error:', err);
});

// Initialize tables if they do not exist
const initDb = async () => {
  const client = await pool.connect();

  try {
    console.log('Initializing database schema...');

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        checkin_date DATE NOT NULL,
        checkout_date DATE NOT NULL,
        gender VARCHAR(10) NOT NULL,
        package_type VARCHAR(20) NOT NULL,
        total_amount VARCHAR(50) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        destination VARCHAR(50) NOT NULL,
        num_guests INTEGER NOT NULL,
        checkin_date DATE NOT NULL,
        checkout_date DATE NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database tables verified/created successfully.');
  } catch (error) {
    console.error('Database schema initialization failed:', error);
  } finally {
    client.release();
  }
};

module.exports = {
  pool,
  initDb,
  query: (text, params) => pool.query(text, params)
};