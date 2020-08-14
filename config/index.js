require('dotenv').config();

const config = {
    PORT: process.env.PORT || 5000,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    JWT_SECRET: process.env.JWT_SECRET
}
module.exports = config;
