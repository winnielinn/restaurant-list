const express = require('express')
const exphbs = require('express-handlebars').create({ defaultLayout: 'main', extname: '.hbs' })
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const restaurants = require('./models/restaurants')
const e = require('express')
const { render } = require('express/lib/response')
const app = express()

const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => console.log('failed to connection!'))
db.once('open', () => console.log('mongoDB connection!'))

app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
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

app.get('/', (req, res) => {
  restaurants.find({})
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('error_page', { status: 500, error: error.message })
    })
})

app.get('/search', (req, res) => {
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

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  restaurants.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render('error_page', { status: 500, error: error.message })
    })
})

app.put('/restaurants/:id', (req, res) => {
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

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  restaurants.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App is listening on http://localhost/${port}`)
})
