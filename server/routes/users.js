var express = require('express');
var router = express.Router();
var userModal = require('../models/user')
require('../until/util')
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
//购物车数量
router.get('/cartNum',function(req,res,next){
  let id = req.cookies.userId
  userModal.findOne({userId:id},function(err,user){
    if(err){
      res.json({
        status:'1',
        message:err.message,
        result:''
      })
    }else{
      let num = 0
      user.cartList.forEach(item=>{
        num += parseInt(item.productNum)
      })
      res.json({
        status:'0',
        message:'',
        result:num
      })
    }
  })
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
//用户地址
router.get('/address',function(req,res,next){
  let id = req.cookies.userId
  userModal.findOne({userId:id},function(err,doc){
    if(err){
      res.json({
        status:'1',
        message:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        message:'',
        result:doc.addressList
      })
    }
  })
})
//设置默认地址
router.post('/default',function(req,res,next){
  let id = req.cookies.userId
  let addressId = req.body.addressId
  if(!addressId){
    res.json({
      status:'10003',
      message:'没传参数',
      result:''
    })
  }
  userModal.findOne({userId:id},function(err,user){
    if(err){
      res.json({
        status:'1',
        message:err.message,
        result:''
      })
    }else{
      let address = user.addressList
      address.forEach(item => {
        if(item.addressId == addressId){
          item.isDefault = true
        }else{
          item.isDefault = false
        }
      })
      user.save(function(err1,doc){
        if(err1){
          res.json({
            status:'1',
            message:err1.message,
            result:''
          })
        }else{
          res.json({
            status:'0',
            message:'设置成功',
            result:''
          })
        }
      })
    }
  })
})
//删除地址
router.post('/deleteAddress',function(req,res,next){
  let id = req.cookies.userId
  let addressId = req.body.addressId
  userModal.update({userId:id},{
    $pull:{
      'addressList':{
      'addressId':addressId
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
//创建订单
router.post('/payment',function(req,res,next){
  let id = req.cookies.userId
  let addressId = req.body.addressId
  let totalPrice = req.body.totalPrice
  userModal.findOne({userId:id},function(err,user){
    if(err){
      res.json({
        status:'1',
        message:err.message,
        result:''
      })
    }else{
      //收货地址
      let address = null
      user.addressList.forEach(item => {
        if(item.isDefault == true){
          address = item
        }
      })
      //商品
      let goods = []
      user.cartList.forEach(item => {
        if(item.checked == 1){
          goods.push(item)
        }
      })
      //订单id
      let format = 233
      let num1 = Math.floor(Math.random()*10)
      let num2 = Math.floor(Math.random()*10)
      let date = new Date().Format('yyyyMMddhhmmss')
      let orderId = format + num1 + date + num2
      //创建订单日期
      let creatDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
      //订单对象
      let order = {
        'orderId':orderId,
        'goods':goods,
        'address':address,
        'totalPrice':totalPrice,
        'orderStatus':1,
        'createDate':creatDate
      }
      user.orderList.push(order)
      user.save(function(err1,doc){
        if(err1){
          res.json({
            status:'1',
            message:err1.message,
            result:''
          })
        }else{
          res.json({
            status:'0',
            message:'创建订单成功',
            result:{
              orderId:orderId,
              totalPrice:totalPrice
            }
          })
        }
      })
    }
  })
})
//获取订单
router.get('/order',function(req,res,next){
  let id = req.cookies.userId
  console.log(req.query);
  let orderId = req.query.orderId
  userModal.findOne({userId:id},function(err,user){
    if(err){
      res.json({
        status:'1',
        message:'未登录',
        result:''
      })
    }else{
      let total = 0
      if(user.orderList.length > 0){
        user.orderList.forEach(item => {
          if(item.orderId == orderId){
            total = item.totalPrice
          }
        })
        if(total > 0){
          res.json({
            status:'0',
            message:'',
            result:{
              'orderId':orderId,
              'total':total
            }
          })
        }else{
          res.json({
            status:'10003',
            message:'没有此订单',
            result:''
          })
        }
        
      }else{
        res.json({
          status:'10002',
          message:'该用户未创建订单',
          result:''
        })
      }
  }
  })
})
module.exports = router;
