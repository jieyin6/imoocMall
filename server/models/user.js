let mongoose = require('mongoose')

let Schema = mongoose.Schema

let userModel = new Schema({
    'userId':String,
    'userName':String,
    'userPwd':String,
    'orderList':Array,
    'cartList':[{
        'productId':String,
        'productName':String,
        'salePrice':Number,
        'productImage':String,
        'checked':String,
        'productNum':String
    }],
    'addressList':[{
        "addressId": String,
        "userName": String,
        "streetName": String,
        "postCode": Number,
        "tel": Number,
        "isDefault":Boolean
    }]
}) 
module.exports = mongoose.model('User',userModel)