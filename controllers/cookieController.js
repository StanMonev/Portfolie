const cookieService = require('../services/cookieService');

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

const getAnalyticsData = async (req, res) => {
  try {
    const analyticsData = await cookieService.getAnalyticsData();
    res.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  trackAnalytics,
  setCookiePreference,
  getAnalyticsData
};
