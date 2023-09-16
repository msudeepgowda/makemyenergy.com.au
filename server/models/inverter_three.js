const mongoose = require('mongoose')

const inverterThreeSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
      },
      size: {
        type: [String],
        required: true
      },
      price: {
        type: [String],
        required: true
      }
})
console.log("Inside invertor three Model")
module.exports = mongoose.model('inverter_three', inverterThreeSchema,'inverter_three')