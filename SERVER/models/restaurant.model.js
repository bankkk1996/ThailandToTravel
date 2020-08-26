const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:'this field is required.'
    },
    address:{
        type:String,
        required:'this field is required.'
    },
    tel:{
        type:String,
        required:'this field is required.'
    },
    detail:{
        type:String,
        required:'this field is required.'
    }
});

mongoose.model('Restaurant',restaurantSchema);