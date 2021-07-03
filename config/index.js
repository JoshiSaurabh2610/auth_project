const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
export const {
    APP_PORT,
    MONGO_URI
} = process.env;

