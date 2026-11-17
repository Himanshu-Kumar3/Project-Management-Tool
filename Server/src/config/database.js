const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async ()=>{
        await mongoose.connect(process.env.MONGOOSE_URL);
}

module.exports = connectDB;