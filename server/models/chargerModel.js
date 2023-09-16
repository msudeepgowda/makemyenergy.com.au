const mongoose = require('mongoose')

const chargerSchema = new mongoose.Schema({
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
      price: {
        type: [String],
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
      logo_image_url: {
        type: String,
        required: true
      },
      product_image_url: {
        type: String,
        required: true
      },
      pdf_url: {
        type: String,
        required: true
      }
})
console.log("Inside battery Model")

module.exports = mongoose.model('charger', chargerSchema,'charger')