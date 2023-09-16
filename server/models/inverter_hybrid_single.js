const mongoose = require('mongoose')

const inverterHybridSingleSchema = new mongoose.Schema({
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
console.log("Inside invertor hybrid single Model")
module.exports = mongoose.model('inverter_hybrid_single', inverterHybridSingleSchema,'inverter_hybrid_single')