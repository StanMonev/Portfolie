/**
 * authService.js
 *
 * This file contains utility functions for user authentication,
 * including password comparison and user authentication using 
 * PostgreSQL as the database.
 *
 * Key functionalities:
 * - Compare a plain text password with a hashed password.
 * - Authenticate a user by verifying the username and password.
 *
 * These functions are essential for managing user login 
 * and ensuring the security of password verification.
 */

const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL: process.env.DEV_DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});


/**
 * Compares a plain text password with a hashed password.
 * 
 * @param {string} password - The plain text password entered by the user.
 * @param {string} hash - The hashed password stored in the database.
 * @returns {Promise<boolean>} - Returns true if the passwords match, otherwise false.
 */

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};


/**
 * Authenticates a user by verifying the username and password.
 * 
 * @param {string} username - The username entered by the user.
 * @param {string} password - The plain text password entered by the user.
 * @returns {Promise<Object|null>} - Returns the user object if authentication is successful, otherwise null.
 */

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

// ///////
// Export
// ///////

module.exports = {
  comparePassword,
  authenticateUser
};
