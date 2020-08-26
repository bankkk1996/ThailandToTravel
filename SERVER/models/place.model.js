const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:'this field is required.'
    },
    lat:{
        type:Number,
        required:'this field is required.'
    },
    lng:{
        type:Number,
        required:'this field is required.'
    },
    description:{
        type:String,
        required:'this field is required.'
    },
    title:{
        type:String,
        required:'this field is required.'
    },
    detail:{
        type:String,
        required:'this field is required.'
    },
    time:{
        type:String,
        required:'this field is required.'
    },
    tel:{
        type:String,
        required:'this field is required.'
    },
    activity:{
        type:String,
        required:'this field is required.'
    }
});

mongoose.model('Place',placeSchema);