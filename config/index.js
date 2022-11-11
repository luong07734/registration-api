const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const config = {
    JWT_SECRET: process.env.JWT_SECRET
}

module.exports = config;