const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
  
})
console.log("Inside Order Model")
module.exports = mongoose.model('orders', ordersSchema)