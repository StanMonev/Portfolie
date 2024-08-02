const knex = require('../db/knex');

const trackAnalytics = async (analyticsData) => {
  try {
    await knex('analytics').insert(analyticsData);
    return { message: 'Data received', data: analyticsData };
  } catch (error) {
    console.error('Error storing analytics data:', error);
    throw new Error('Internal server error');
  }
};

const setCookiePreference = async (cookieData) => {
  try {
    await knex('functional_cookies').insert(cookieData);
    return { message: 'Preference saved', data: cookieData };
  } catch (error) {
    console.error('Error saving preference:', error);
    throw new Error('Internal server error');
  }
};

const getAnalyticsData = async () => {
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

    return { dailyVisitors, weeklyVisitors, monthlyVisitors, countryVisitors };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw new Error('Internal server error');
  }
};

module.exports = {
  trackAnalytics,
  setCookiePreference,
  getAnalyticsData
};
