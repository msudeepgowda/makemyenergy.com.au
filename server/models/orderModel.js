const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  state: {
    type: String
  },
  bill: {
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
  panel_id: {
    type: String
  },
  panel_brand: {
    type: String
  },
  panel_model: {
    type: String
  },
  panel_size: {
    type: String
  },
  panel_number: {
    type: String
  },
  panel_price: {
    type: String
  },
  inverter_id: {
    type: String
  },
  inverter_brand: {
    type: String
  },
  inverter_model: {
    type: String
  },
  inverter_size: {
    type: String
  },
  inverter_price: {
    type: String
  },
  battery_id: {
    type: String
  },
  battery_brand: {
    type: String
  },
  battery_model: {
    type: String
  },
  battery_epsFlag: {    // Yes or No
    type: String
  },
  battery_price: {
    type: String
  },
  additional_prod: {
    type: String
  },
  ev_charger_id: {
    type: String
  },
  ev_charger_brand: {
    type: String
  },
  ev_charger_model: {
    type: String
  },
  ev_charger_phase: {
    type: String
  },
  ev_charger_size: {
    type: String
  },
  ev_charger_price: {
    type: String
  },
  optimizer_id: {
    type: String
  },
  optimizer_brand: {
    type: String
  },
  optimizer_model: {
    type: String
  },
  optimizer_price: {
    type: Number
  },
  stc: {
    type: Number
  },
  rebate: {
    type: Number
  },
  additional_cost: {
    type: Number
  },
  total_price: {
    type: Number
  },
  orderType: {
    type: String,    // System Design Order or individual product order
    required: true
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
 
module.exports = mongoose.model("orders", orderSchema);