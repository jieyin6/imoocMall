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
    let page = parseInt(req.query.page)
    let pageSize = parseInt(req.query.pageSize)
    let priceItem = parseInt(req.query.pickPrice)
    let sort = req.query.sort
    let skip = (page - 1) * pageSize
    let param = {}
    let min,max = null
    if(priceItem != 0){
        switch (priceItem){
            case 1 : min = 0 ; max = 100 ; break;
            case 2 : min = 101 ; max = 500 ; break;
            case 3 : min = 501 ; max = 1000 ; break;
            case 4 : min = 1001 ; max = 5000 ; break
        }
        param = {
            salePrice:{
                $gt:min,
                $lte:max
            }
        }
    }
    let goodModel = Goods.find(param).skip(skip).limit(pageSize)
    goodModel.sort({'salePrice':sort})
    goodModel.exec(function (err,doc){
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