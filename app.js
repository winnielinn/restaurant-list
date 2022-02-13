const express = require('express')
const exphbs = require('express-handlebars').create({ defaultLayout: 'main', extname: '.hbs' })
const mongoose = require('mongoose')
const restaurants = require('./models/restaurants')
const app = express()

const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => console.log('failed to connection!'))
db.once('open', () => console.log('mongoDB connection!'))

app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs')
app.use(express.static('public'))

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
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App is listening on http://localhost/${port}`)
})
