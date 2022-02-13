const mongoose = require('mongoose')
const restaurants = require('../restaurants')
const restaurantList = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => console.log('failed to connection!'))
db.once('open', () => {
  console.log('mongoDB connection!')

  restaurants.insertMany(restaurantList)
    .then(() => console.log('seed data done!'))
    .catch(error => console.log(error))
})