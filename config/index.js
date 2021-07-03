const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
export const {
    APP_PORT,
    MONGO_URI,
    JWT_SECRET,
    JWT_EXPIRE
} = process.env;

