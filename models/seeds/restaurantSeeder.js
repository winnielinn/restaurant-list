// database
const Restaurant = require('../Restaurant')
const User = require('../User')

// seed data
const restaurantList = require('../../restaurant.json').results
const userList = require('../../user.json').results

const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

db.once('open', () => {
  for (let user_index = 0; user_index < userList.length; user_index++) {
    // create users
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(userList[user_index].password, salt))
      .then(hash => User.create({
        name: userList[user_index].name,
        email: userList[user_index].email,
        password: hash
      }))
      // create restaurant
      .then(user => {
        const restaurants = []

        restaurantList.forEach((restaurant, res_index) => {
          if (res_index >= 3 * user_index && res_index < 3 * (user_index + 1)) {
            restaurant.userId = user._id
            restaurants.push(restaurant)
          }
        })
        return Restaurant.create(restaurants)
      })
      .then(() => console.log('Seed data created!'))
      .catch(err => console.log(err))
  }
})