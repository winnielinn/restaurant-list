const Restaurant = require('../models/Restaurant')

const restController = {
  createRestaurant: (req, res) => {
    res.render('new')
  },
  postRestaurant: (req, res) => {
    const { name, category, location, phone, rating } = req.body
    req.body['userId'] = req.user._id

    const type = {
      NAME: 'string',
      LOCATION: 'string',
      PHONE: 'number'
    }

    if (typeof name === type.NAME && typeof location === type.LOCATION && typeof Number(phone) === type.PHONE) {
      Restaurant.create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    } else {
      const error = 'Please check your format again'
      res.render('errorPage', { status: 500, error })
    }
  },
  getRestaurant: (req, res) => {
    const _id = req.params.id
    const userId = req.user._id

    Restaurant.findOne({ _id, userId })
      .lean()
      .then(restaurant => res.render('detail', { restaurant }))
      .catch(error => {
        console.log(error)
        res.render('error_page', { status: 500, error: error.message })
      })
  },
  editRestaurant: (req, res) => {
    const _id = req.params.id
    const userId = req.user._id

    Restaurant.findOne({ _id, userId })
      .lean()
      .then(restaurant => res.render('edit', { restaurant }))
      .catch(error => {
        console.log(error)
        res.render('error_page', { status: 500, error: error.message })
      })
  },
  putRestaurantt: (req, res) => {
    const { name, category, location, phone, rating } = req.body
    req.body['userId'] = req.user._id
    const id = req.params.id

    const type = {
      NAME: 'string',
      CATEGORY: 'string',
      LOCATION: 'string',
      PHONE: 'number',
      RATING: 'number'
    }
    if (typeof name === type.NAME && typeof location === type.LOCATION && typeof Number(phone) === type.PHONE) {
      Restaurant.findByIdAndUpdate(id, req.body)
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.log(error))
    } else {
      const error = 'Please check your format again'
      res.render('errorPage', { status: 500, error })
    }
  },
  deleteRestaurantt: (req, res) => {
    const _id = req.params.id
    const userId = req.user._id

    Restaurant.findOne({ _id, userId })
      .then(restaurant => restaurant.remove())
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  }
}

module.exports = restController