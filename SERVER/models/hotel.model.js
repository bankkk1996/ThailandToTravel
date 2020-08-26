const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
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
    link:{
        type:String,
        required:'this field is required.'
    }
});

mongoose.model('Hotel',hotelSchema);