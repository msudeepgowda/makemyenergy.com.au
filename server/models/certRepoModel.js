const mongoose = require('mongoose')

const certRepoSchema = new mongoose.Schema({
    brand: {
    type: String,
    required: true
  },
  cert_url: {
    type: String,
    required: true
  }
})
console.log("Inside Panel Model")
module.exports = mongoose.model('certRepo', certRepoSchema,'certRepo')