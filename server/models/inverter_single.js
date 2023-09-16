const mongoose = require('mongoose')

const inverterSingleSchema = new mongoose.Schema({
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
console.log("Inside invertor Model")
module.exports = mongoose.model('inverter_single', inverterSingleSchema,'inverter_single')