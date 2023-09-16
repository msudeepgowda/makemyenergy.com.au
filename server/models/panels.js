const mongoose = require('mongoose')

const panelSchema = new mongoose.Schema({
    brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  size: {
    type: [String],
    required: true
  },
  no_of_panels: {
    type: [Number],
    required: true
  },
  price: {
    type: [String],
    required: true
  },
  logo_image_url: {
    type: String,
    required: true
  },
  product_image_url: {
    type: String,
    // required: true
  },
  status: {
    type: String,
    required: true
  },
  product_desc: {
    type: String
    // required: true
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
    type: String
    // required: true
  }
})
console.log("Inside Panel Model")
module.exports = mongoose.model('panels', panelSchema,'panels')