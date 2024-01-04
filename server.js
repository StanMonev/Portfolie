if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const pagesRouter = require("./routes/pages");

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(pagesRouter)

app.listen(process.env.PORT)
