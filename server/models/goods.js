const mongoose = require('mongoose')

const Schema = mongoose.Schema

const product = new Schema({
    'productId':String,
    'productImage':String,
    'productName':String,
    'salePrice':Number,
    'productNum':Number,
    'checked':String
})

module.exports = mongoose.model('good',product)