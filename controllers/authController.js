const authService = require('../services/authService');

const ensureAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
};

const loginUser = async (req, res) => {
  const { username, password, rememberMe } = req.body;
  const user = await authService.authenticateUser(username, password);
  if (user) {
    req.session.userId = user.id;
    if (rememberMe) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
      req.session.cookie.expires = false;
    }
    res.redirect('/admin');
  } else {
    console.log('Authentication failed');
    req.flash('error', 'Invalid username or password');
    res.redirect('/login');
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
};

module.exports = {
  ensureAuthenticated,
  loginUser,
  logoutUser
};
