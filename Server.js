import express from 'express';
import cors from 'cors'
// Method -1
require('dotenv').config({ path: "./config.env" });
const APP_PORT = process.env.APP_PORT;


// Method-2
// import { APP_PORT } from './config';
import connectDB from './config/db';
import ErrorHandler from './middlewares/error';
import PrivateRouter from './routes/private';
import AuthRouter from './routes/auth';
const app = express();
connectDB();
app.use(cors())
app.use(express.json());

app.use('/api/auth', AuthRouter);
app.use('/api/private', PrivateRouter);

// Error Handler should be last peice of middlerware
app.use(ErrorHandler);

console.log(APP_PORT);

const server = app.listen(APP_PORT, () => { console.log(`server running at APP_PORT = ${APP_PORT}`) });
