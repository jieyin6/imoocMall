const mongoose = require('mongoose')

const Schema = mongoose.Schema

const product = new Schema({
    'productId':String,
    'productImage':String,
    'productName':String,
    'salePrice':Number
})

module.exports = mongoose.model('good',product)