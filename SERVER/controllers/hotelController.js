const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');

router.get('/',(req,res)=>{
    res.render("hotel/addOrEdit",{viewTitle:"Insert Hotel"});
});

router.post('/',(req,res)=>{
    if(req.body._id =='')
        insertRecord(req,res);
    else
        updateRecord(req,res);
});

function insertRecord(req,res){
    const hotel = new Hotel();
    hotel.name = req.body.name;
    hotel.address = req.body.address;
    hotel.tel = req.body.tel;
    hotel.link = req.body.link;
    hotel.save((err,doc)=>{
        if(!err)
            res.redirect('hotel/list');
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("hotel/addOrEdit",{
                    viewTitle: "Insert Hotel",
                    hotel:req.body
                })
            }   
            else
                console.log('Error during record insertion : '+ err);
        }
    });
}

function updateRecord(req,res){
    Hotel.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('hotel/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("hotel/addOrEdit", {
                    viewTitle: 'Update Hotel',
                    hotel: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Hotel.find((err, docs) => {
        if (!err) {
            res.render("hotel/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving hotel list :' + err);
        }
    });
});


function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'name': body['nameError'] = err.errors[field].message;break;
            case 'address': body['addressError'] = err.errors[field].message;break;
            case 'tel': body['telError'] = err.errors[field].message;break;
            case 'link': body['linkError'] = err.errors[field].message;break;
            
        }
    }
}

router.get('/:id', (req, res) => {
    Hotel.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("hotel/addOrEdit", {
                viewTitle: "Update Hotel",
                hotel: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Hotel.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/hotel/list');
        }
        else { console.log('Error in place delete :' + err); }
    });
});

module.exports = router;