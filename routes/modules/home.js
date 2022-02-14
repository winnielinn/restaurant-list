const express = require('express')
const restaurants = require('../../models/restaurants')
const router = express.Router()

router.get('/', (req, res) => {
  restaurants.find({})
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.replace('/\s+/g', '')
  const regexp = new RegExp(keyword, 'i')

  restaurants.find({ $or: [{ 'name': regexp }, { 'name_en': regexp }, { 'category': regexp }] })
    .lean()
    .then(restaurant => res.render('index', { restaurant, keyword }))
    .catch(error => {
      console.log(error)
      res.render('error_page', { status: 500, error: error.message })
    })
})

module.exports = router