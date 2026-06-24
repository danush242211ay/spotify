const mongoose = require('mongoose');

const dns = require('dns');
dns.setServers([
    '8.8.8.8',
    '1.1.1.1'
]);


async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to DB");
    }
    catch(err){
        console.error(err);
        console.log("could not connect to DB");
    }
}


module.exports = connectDB;