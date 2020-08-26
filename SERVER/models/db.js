const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:1234@cluster0-hhua1.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true',{useNewUrlParser:true},(err)=>{
    if(!err){console.log('MongoDB Connection Succeeded')}
    else{ console.log('Error in DB connection :' + err)}
});

require('./place.model');
require('./hotel.model');
require('./restaurant.model');
require('./user.model');