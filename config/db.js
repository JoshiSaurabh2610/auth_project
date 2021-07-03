import { MONGO_URI } from './index.js';
const mongoose = require('mongoose')
const connectDB = async () => {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true });
    console.log("mongodbConnected");
}
export default connectDB;