/**
 * cookieController.js
 *
 * This file contains controller functions for handling user cookie preferences
 * and tracking analytics data within the application. These functions process
 * incoming requests, interact with the cookieService for data manipulation,
 * and send appropriate responses back to the client.
 *
 * Key functionalities:
 * - Track and store analytics data based on user interactions.
 * - Manage user cookie preferences by storing their choices.
 * - Retrieve stored analytics data for analysis and reporting.
 *
 * This controller ensures that all operations related to cookies and analytics
 * are handled efficiently and that data is stored and retrieved appropriately.
 */

const cookieService = require('../services/cookieService');


/**
 * Tracks and stores analytics data for user interactions.
 * 
 * @param {Object} req - The request object containing analytics data such as URL, referrer, user agent, etc.
 * @param {Object} res - The response object used to send back the result.
 * @returns {Promise<void>} - Sends a JSON response indicating success or failure.
 */

const trackAnalytics = async (req, res) => {
  const { url, referrer, userAgent, timestamp, sessionId } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const geo = require('geoip-lite').lookup(ip);
  const country = geo ? geo.country : 'Unknown';

  const analyticsData = {
    url,
    referrer,
    user_agent: userAgent,
    ip,
    country,
    timestamp,
    session_id: sessionId
  };

  try {
    const response = await cookieService.trackAnalytics(analyticsData);
    res.json(response);
  } catch (error) {
    console.error('Error storing analytics data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Stores user cookie preferences.
 * 
 * @param {Object} req - The request object containing cookie preference data.
 * @param {Object} res - The response object used to send back the result.
 * @returns {Promise<void>} - Sends a JSON response indicating success or failure.
 */

const setCookiePreference = async (req, res) => {
  const { sessionId, cookieName, cookieValue } = req.body;

  const cookieData = {
    session_id: sessionId,
    cookie_name: cookieName,
    cookie_value: cookieValue
  };

  try {
    const response = await cookieService.setCookiePreference(cookieData);
    res.json(response);
  } catch (error) {
    console.error('Error saving preference:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Retrieves stored analytics data.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to send back the analytics data.
 * @returns {Promise<void>} - Sends a JSON response containing the analytics data.
 */

const getAnalyticsData = async (req, res) => {
  try {
    const { filterIPs } = req.query;
    const analyticsData = await cookieService.getAnalyticsData(filterIPs);
    res.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ///////
// Export
// ///////

module.exports = {
  trackAnalytics,
  setCookiePreference,
  getAnalyticsData
};
