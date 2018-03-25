var express = require('express');
var router = express.Router();
var userModal = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req,res,next){
  let param={
    username : req.username,
    password : req.password
  }
  userModal.findOne(param,function(err,doc){
    if(err){
      res.json({
        status:'1',
        message:err.message
      })
    }else{
        if(doc){
          res.cookie('userId',doc.userId,{
            path:'/',
            maxAge:1000 * 60 * 60
          })
          res.json({
            status:'0',
            message:'',
            result:{
              user:doc.userName,
            }
          })
        }
    }
  })
})
module.exports = router;
