const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String
  },
  category: {
    type: String
  },
  image: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String
  },
  rating: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}) 

module.exports = mongoose.model('restaurants', restaurantSchema)