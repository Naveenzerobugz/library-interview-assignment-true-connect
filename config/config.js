const mongoose = require('mongoose');
var env = require('dotenv').config()

mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    },
    (err) => {
        if (!err) {
            console.log('MongoDB Connection Succeeded.')
        } else {
            console.log('Error in DB connection : ' + err)
        }
    });


// require('../config/config')
require('../models/index')