const restaurants = require('../restaurants')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  restaurants.insertMany(restaurantList)
    .then(() => console.log('seed data done!'))
    .catch(error => console.log(error))
})