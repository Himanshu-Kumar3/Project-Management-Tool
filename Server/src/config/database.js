const mongoose = require('mongoose');

const connectDB = async ()=>{
        await mongoose.connect('mongodb://localhost:27017/Project-Management-Tool');
}

module.exports = connectDB;