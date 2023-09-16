const mongoose = require('mongoose')

const imageRepoSchema = new mongoose.Schema({
    brand: {
    type: String,
    required: true
  },
  logo_image_url: {
    type: String,
    required: true
  }
})
console.log("Inside Panel Model")
module.exports = mongoose.model('imageRepo', imageRepoSchema,'imageRepo')