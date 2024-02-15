const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGO_URL;

const dbConnect = () => {
    mongoose.connect(URL)
    .then(()=> console.log('Db connected Successfully'))
    .catch((err) => console.log("Error while connecting DB ", err))
}

module.exports = dbConnect;