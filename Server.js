const express = require('express');
/*
// Method -1
require('dotenv').config({path:"./config.env"});
const APP_PORT = process.env.APP_PORT ;
*/

// Method-2
import { APP_PORT } from './config';
import connectDB from './config/db';
const app = express();
connectDB();

app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
console.log(APP_PORT);

const server = app.listen(APP_PORT, () => { console.log(`server running at APP_PORT = ${APP_PORT}`) });
