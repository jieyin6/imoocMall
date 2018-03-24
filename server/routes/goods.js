const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Goods = require('../models/goods')

mongoose.connect('mongodb://127.0.0.1:27017/project')

mongoose.connection.on('connected',function(){
    console.log('success');
    })
mongoose.connection.on('error',function(){
        console.log('fail');
    })
router.get('/',function(req,res,next){
    Goods.find({} , function (err,doc){
        if(err){
            res.json({
                status:'1',
                message:err.message
            })
        }else{
            res.json({
                status:'0',
                message:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }
    
    })
})

module.exports = router