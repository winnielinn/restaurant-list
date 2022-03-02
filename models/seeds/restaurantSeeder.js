const Restaurant = require('../Restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  Restaurant.insertMany(restaurantList)
    .then(() => console.log('seed data done!'))
    .catch(error => console.log(error))
})