if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();
const pagesRouter = require("./routes/logic");

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

// Session configuration
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(pagesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
