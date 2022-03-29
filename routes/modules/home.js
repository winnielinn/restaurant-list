const express = require('express')
const Restaurant = require('../../models/Restaurant')
const router = express.Router()

router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.replace(/\s+/g, '')
  const regexp = new RegExp(keyword, 'i')

  Restaurant.find({ $or: [{ 'name': regexp }, { 'name_en': regexp }, { 'category': regexp }], userId })
    .lean()
    .then(restaurant => {
      if (!restaurant.length) return res.render('index', { keyword })
      
      return res.render('index', { restaurant })
    })
    .catch(error => {
      console.log(error)
      res.render('error_page', { status: 500, error: error.message })
    })
})

module.exports = router