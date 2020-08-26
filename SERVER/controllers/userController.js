const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Crypto = require('crypto');
const hash = Crypto.createHash('sha512');



router.post('/register',async (req,res)=>{
    try {
        
     
    const user = await User.findOne({username:req.body.username});
    if(user==null){
        const data = hash.update(req.body.password,'utf8').digest('hex');
        const user = new User();
        user.username = req.body.username;
        user.password = data;
        user.email = req.body.email;
        user.name = req.body.name;
        user.save((err,doc)=>{
            if(!err)
                res.redirect('/');
        });
    }else{
        res.send('User Already');
    }
    }catch (error) {
        
    }
});

router.post('/login',async (req,res)=>{
    try {
        const data = require('crypto').createHash('sha512').update(req.body.password).digest('hex');
        const user =  await User.findOne({username:req.body.username,password:data});
        if(user!=null){
            res.cookie('username',user.username,{maxAge:900000,httpOnly:true});
            res.render("index/index");
        }else{
            res.render("index/login");
        }
    }   catch (err) {
        res.send({message:err});
    }
    
});

router.get('/logout',(req,res)=>{
    res.clearCookie('username');
    res.render("index/login");
});
module.exports = router;