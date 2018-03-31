//import { readFile } from '_tsconfig@7.0.0@tsconfig';

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
          res.cookie('userName',doc.userName,{
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
//登出接口
router.post('/loginout',function(req,res,next){
  res.cookie('userId','',{
    path:'/',
    maxAge:-1 //储存时间
  })
  res.json({
    status:'1',
    message:'',
    result:''
  })
})
//检验是否登录接口
router.get('/checkLogin',function(req,res,next){
  if(req.cookies.userId){
    res.json({
      status:'0',
      message:'',
      result:req.cookies.userName
    })
  }else{
    res.json({
      status:'1',
      message:'未登录',
      result:''
    })
  }
})
router.get('/cart',function(req,res,next){
  console.log(req.cookies.userId);
  
  if(req.cookies.userId){
    let id = req.cookies.userId
    userModal.findOne({userId:id},function(err,doc){
      if(err){
        res.json({
          status:'1',
          message:'当前未登录',
          result:''
        })
      }else{
        res.json({
          status:'0',
          message:'',
          result:doc.cartList
        })
      }
    })
  }else{
    res.json({
      status:'1',
      message:'未登录',
      result:''
    })
  }
})
//购物车删除
router.post('/del',function(req,res,next){
  let id = req.body.productId
  let user = req.cookies.userId
  console.log(id,user);
  userModal.update({userId:user},{
    $pull:{
      'cartList':{
      'productId':id
      }
    }
  },function(err,doc){
    if(err){
      res.json({
        status:'1',
        message:'删除失败',
        result:''
      })
    }else{
      res.json({
        status:'0',
        message:'删除成功',
        result:''
      })
    }
  }) 
})

//购物车加减选中
router.post('/cartNum',function(req,res,next){
  console.log(req.body.checked);
  
  let user = req.cookies.userId
  let num = req.body.productNum
  let id = req.body.productId
  let checked = req.body.checked
  userModal.update({"userId":user,"cartList.productId":id},{
    "cartList.$.productNum":num,
    "cartList.$.checked":checked
  },function(err,doc){
    if(err){
      res.json({
        status:'1',
        message:'操作失败',
        result:''
      })
    }else{
      res.json({
        status:"0",
        message:'操作成功',
        result:''
      })
    }
  })
})
//全选
router.post('/checkAll',function(req,res,next){
  let user = req.cookies.userId
  let checkAll = req.body.checkAll ? '1' : '0'
  userModal.findOne({userId:user},function(err1,user){
    if(err1){
      res.json({
        status:'1',
        message:'用户未找到',
        result:''
      })
    }else{
      if(user){
        user.cartList.forEach(item => {
          item.checked = checkAll
        })
        user.save(function(err2,doc){
          
          if(err2){
           res.json({
            status:'1',
            message:err2.message,
            result:''
           })
        }else{
          res.json({
            status:'0',
            message:'全选或取消全选成功',
            result:''
          })
        }
      })
      }
    }
  })
})
module.exports = router;
