const knex = require('../db/knex');
const geoip = require('geoip-lite');

exports.trackAnalytics = async (req, res) => {
  const { url, referrer, userAgent, timestamp, sessionId } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip);
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
    await knex('analytics').insert(analyticsData);
    res.json({ message: 'Data received', data: analyticsData });
  } catch (error) {
    console.error('Error storing analytics data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.setCookiePreference = async (req, res) => {
  const { sessionId, cookieName, cookieValue } = req.body;

  const cookieData = {
    session_id: sessionId,
    cookie_name: cookieName,
    cookie_value: cookieValue
  };

  try {
    await knex('functional_cookies').insert(cookieData);
    res.json({ message: 'Preference saved', data: cookieData });
  } catch (error) {
    console.error('Error saving preference:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAnalyticsData = async (req, res) => {
    try {
        const dailyVisitors = await knex('analytics')
            .select(knex.raw('DATE(timestamp) as date'), knex.raw('count(*) as count'))
            .groupByRaw('DATE(timestamp)')
            .orderBy('date', 'desc');

        const weeklyVisitors = await knex('analytics')
            .select(knex.raw('DATE_TRUNC(\'week\', timestamp) as week'), knex.raw('count(*) as count'))
            .groupByRaw('DATE_TRUNC(\'week\', timestamp)')
            .orderBy('week', 'desc');

        const monthlyVisitors = await knex('analytics')
            .select(knex.raw('DATE_TRUNC(\'month\', timestamp) as month'), knex.raw('count(*) as count'))
            .groupByRaw('DATE_TRUNC(\'month\', timestamp)')
            .orderBy('month', 'desc');

        const countryVisitors = await knex('analytics')
            .select('country', knex.raw('count(*) as count'))
            .groupBy('country')
            .orderBy('count', 'desc');

        res.json({ dailyVisitors, weeklyVisitors, monthlyVisitors, countryVisitors });
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
