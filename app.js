const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const articles = require('./routes/articles');
const user = require('./routes/user');
const app = express();
const db = require('./utils/db');

app.use(express.json())

app.use(morgan('common'));
app.use(cors());

app.use('/articles', articles);
app.use('/user', user);

module.exports = app;