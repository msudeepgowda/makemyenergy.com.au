const mongoose = require('mongoose')

const stcPriceSchema = new mongoose.Schema({

  price: {
    type: Number,
    required: true
  }
})
console.log("Inside Panel Model")
module.exports = mongoose.model('stcPrice', stcPriceSchema,'stcPrice')