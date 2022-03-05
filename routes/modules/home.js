const express = require('express')
const Restaurant = require('../../models/Restaurant')
const sortFilter = require('../../sort_filter')
const router = express.Router()

router.get('/', (req, res) => {
  const sort = req.query.sort
  const userId = req.user._id
  const filter = sortFilter(sort)

  Restaurant.find({ userId })
    .lean()
    .sort(filter)
    .then(restaurant => res.render('index', { restaurant, sort }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.replace(/\s+/g, '')
  const regexp = new RegExp(keyword, 'i')

  Restaurant.find({ $or: [{ 'name': regexp }, { 'name_en': regexp }, { 'category': regexp }], userId })
    .lean()
    .then(restaurant => res.render('search', { restaurant, keyword }))
    .catch(error => {
      console.log(error)
      res.render('error_page', { status: 500, error: error.message })
    })
})

module.exports = router