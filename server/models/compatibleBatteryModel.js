const mongoose = require('mongoose')

const compatibleBatterySchema = new mongoose.Schema({
    inverter_brand: {
    type: String,
    required: true
  },
  compatible_batteries: {
    type: [Object],
    required: true
  }
})
// console.log("Inside battery Model")

module.exports = mongoose.model('battery_compatibility', compatibleBatterySchema,'battery_compatibility')