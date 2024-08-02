const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Function to compare passwords
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Function to authenticate user login
const authenticateUser = async (username, password) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return null;
    }
    const user = result.rows[0];
    const isPasswordMatch = await comparePassword(password, user.password);
    return isPasswordMatch ? user : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  comparePassword,
  authenticateUser
};
