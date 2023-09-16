const mongoose = require('mongoose')

const stateRebateSchema = new mongoose.Schema({
    state_cd: {
    type: String,
    required: true
  },
  panel_rebate: {
    type: Number,
    required: true
  },
  battery_rebate: {
    type: Number,
    required: true
  },
  states: {
    type: String,
    required: true
  }
})
console.log("Inside Panel Model")
module.exports = mongoose.model('stateRebate', stateRebateSchema,'stateRebate')