const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  suburb: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  user_type: {
    type: String,
    required: true
  },
  orders:{
    type: [String]
  },
  electricity_bill_url:{
    type: String
  },
  meterboard_url:{
    type: String
  },
  meter_standing_pos: {
    type: String
  },
  inverter_url:{
    type: String
  },
  inverter_standing_pos: {
    type: String
  },
  roof_url:{
    type: String
  },
  progress_url:{
    type: String
  }
})
console.log("Inside User Model")
 
module.exports = mongoose.model("users", userSchema);