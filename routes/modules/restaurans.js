const express = require('express')
const restaurants = require('../../models/restaurants')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name, category, location, phone, rating } = req.body
  const type = {
    NAME: 'string',
    CATEGORY: 'string',
    LOCATION: 'string',
    PHONE: 'number',
    RATING: 'number'
  }
  if (typeof name === type.NAME && typeof category === type.CATEGORY && typeof location === type.LOCATION && typeof Number(phone) === type.PHONE && typeof Number(rating) === type.RATING) {
    restaurants.create(req.body)
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  } else {
    const error = 'Please check your format again'
    res.render('errorPage', { status: 500, error })
  }
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('error_page', { status: 500, error: error.message })
    })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('error_page', { status: 500, error: error.message })
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, category, location, phone, rating } = req.body
  const type = {
    NAME: 'string',
    CATEGORY: 'string',
    LOCATION: 'string',
    PHONE: 'number',
    RATING: 'number'
  }
  if (typeof name === type.NAME && typeof category === type.CATEGORY && typeof location === type.LOCATION && typeof Number(phone) === type.PHONE && typeof Number(rating) === type.RATING) {
    restaurants.findByIdAndUpdate(id, req.body)
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch(error => console.log(error))
  } else {
    const error = 'Please check your format again'
    res.render('errorPage', { status: 500, error })
  }
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  restaurants.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router