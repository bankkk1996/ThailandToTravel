const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');

router.get('/',(req,res)=>{
    res.render("restaurant/addOrEdit",{viewTitle:"Insert Restaurant"});
});

router.post('/',(req,res)=>{
    if(req.body._id =='')
        insertRecord(req,res);
    else
        updateRecord(req,res);
});

function insertRecord(req,res){
    const restaurant = new Restaurant();
    restaurant.name = req.body.name;
    restaurant.address = req.body.address;
    restaurant.tel = req.body.tel;
    restaurant.detail = req.body.detail;
    restaurant.save((err,doc)=>{
        if(!err)
            res.redirect('restaurant/list');
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("restaurant/addOrEdit",{
                    viewTitle: "Insert Restaurant",
                    restaurant:req.body
                })
            }   
            else
                console.log('Error during record insertion : '+ err);
        }
    });
}

function updateRecord(req,res){
    Restaurant.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('restaurant/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("restaurant/addOrEdit", {
                    viewTitle: 'Update Restaurant',
                    restaurant: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Restaurant.find((err, docs) => {
        if (!err) {
            res.render("restaurant/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving restaurant list :' + err);
        }
    });
});


function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'name': body['nameError'] = err.errors[field].message;break;
            case 'address': body['addressError'] = err.errors[field].message;break;
            case 'tel': body['telError'] = err.errors[field].message;break;
            case 'link': body['detailError'] = err.errors[field].message;break;
            
        }
    }
}

router.get('/:id', (req, res) => {
    Restaurant.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("restaurant/addOrEdit", {
                viewTitle: "Update Restaurant",
                restaurant: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Restaurant.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/restaurant/list');
        }
        else { console.log('Error in place delete :' + err); }
    });
});

module.exports = router;