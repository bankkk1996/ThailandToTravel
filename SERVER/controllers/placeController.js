const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Place = mongoose.model('Place');

router.get('/',(req,res)=>{
    res.render("place/addOrEdit",{viewTitle:"Insert Place"});
});

router.post('/',(req,res)=>{
    if(req.body._id =='')
        insertRecord(req,res);
    else
        updateRecord(req,res);
});

function insertRecord(req,res){
    const place = new Place();
    place.name = req.body.name;
    place.lat = req.body.lat;
    place.lng = req.body.lng;
    place.description = req.body.description;
    place.title = req.body.title;
    place.detail = req.body.detail;
    place.time = req.body.time;
    place.tel = req.body.tel;
    place.activity = req.body.activity;
    place.save((err,doc)=>{
        if(!err)
            res.redirect('place/list');
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("place/addOrEdit",{
                    viewTitle: "Insert Place",
                    place:req.body
                })
            }   
            else
                console.log('Error during record insertion : '+ err);
        }
    });
}

function updateRecord(req,res){
    Place.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('place/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("place/addOrEdit", {
                    viewTitle: 'Update Place',
                    place: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Place.find((err, docs) => {
        if (!err) {
            res.render("place/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'name': body['nameError'] = err.errors[field].message;break;
            case 'lat': body['latError'] = err.errors[field].message;break;
            case 'lng': body['lngError'] = err.errors[field].message;break;
            case 'description': body['descriptionError'] = err.errors[field].message;break;
            case 'title': body['titleError'] = err.errors[field].message;break;
            case 'detail': body['detailError'] = err.errors[field].message;break;
            case 'time': body['timeError'] = err.errors[field].message;break;
            case 'tel': body['telError'] = err.errors[field].message;break;
            case 'activity': body['activityError'] = err.errors[field].message;break;
        }
    }
}

router.get('/:id', (req, res) => {
    Place.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("place/addOrEdit", {
                viewTitle: "Update Place",
                place: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Place.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/place/list');
        }
        else { console.log('Error in place delete :' + err); }
    });
});

module.exports = router;