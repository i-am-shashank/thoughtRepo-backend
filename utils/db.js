const mongoose = require('mongoose');
const { DB_USER, DB_PASSWORD, DB_HOST} = require('../config');

const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/<dbname>?retryWrites=true&w=majority`

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log("CONNETED TO DB"));

module.exports = db;