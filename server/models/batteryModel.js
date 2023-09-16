const mongoose = require('mongoose')

const batterySchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  logo_image_url: {
    type: String,
    required: true
  },
  product_image_url: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  product_desc: {
    type: String,
    required: true
  },
  prod_warranty: {
    type: String,
    required: true
  },
  efficiancy_warranty: {
    type: String,
    required: true
  },
  pdf_url: {
    type: String,
    required: true
  },
    with_eps: {
        type: Number,
        required: true
      },
    without_eps: {
        type: Number,
        required: true
      },
    min: {
        type: Number,
        required: true
      },
    max: {
        type: Number,
        required: true
      },
    chareger_req_ind: {
        type: String
      }    
})
console.log("Inside battery Model")

module.exports = mongoose.model('battery', batterySchema,'battery')