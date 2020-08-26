const express = require('express');
const router = express.Router();
const authVerify = require('../auth');

router.get('/',(req,res)=>{
        console.log('Cookies: ', req.cookies['username']);
        if(req.cookies['username']!=undefined)
                res.render("index/index");
        else
                res.render("index/login");
});

module.exports = router;