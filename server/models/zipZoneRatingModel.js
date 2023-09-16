const mongoose = require('mongoose')

const zipZoneRatingSchema = new mongoose.Schema({
    from: {
    type: Number,
    required: true
  },
  to: {
    type: Number,
    required: true
  },
  zone: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
})
console.log("Inside Panel Model")
module.exports = mongoose.model('zipZoneRating', zipZoneRatingSchema,'zipZoneRating')