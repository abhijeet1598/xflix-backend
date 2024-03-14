const dotenv = require('dotenv');
dotenv.config();

const config = {
    mongodb_uri: process.env.MONGODB_URI,
    port: process.env.port
}

module.exports = config;