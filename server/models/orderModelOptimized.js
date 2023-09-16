const mongoose = require('mongoose')

const orderOptimizedSchema = new mongoose.Schema({
  state: {
    type: String
  },
  bill: {    // User quarterly bill that they pay
    type: Number
  },
  zip: {
    type: Number
  },
  property_type: {
    type: String
  },
  floor_type: {
    type: String
  },
  roof_type: {
    type: String
  },
  roof_material: {
    type: String
  },
  meter_type: {
    type: String
  },
  panel_existance_status: {
    type: String
  },
  panel_size: {
    type: String
  },
  panel_number: {
    type: Number
  },
  inverter_size: {
    type: String
  },
  panel_id: {
    type: String
  },
  inverter_id: {
    type: String
  },
  battery_id: {
    type: String
  },
  eps_info: {
    type: String
  },
  hybrid_inverter_id: {
    type: String
  },
  battery_charger_ind: {
    type: String
  },
  optimizer_id: {
    type: String
  },
  EV_charger_size: {
    type: String
  },
  EV_charger_id: {
    type: String
  },
  total_price: {
    type: Number
  },
  orderType: {
    type: String    // System Design Order or individual product order
  },
  user_id: {
    type: String,
    required: true
  },
  order_date_time: {
    type: Number,
    required: true
  }
})
console.log("Inside order Model")
// var userModel=mongoose.model('users',userSchema);
 
module.exports = mongoose.model("userOrders", orderOptimizedSchema);