const express = require('express')
const exphbs = require('express-handlebars').create({ defaultLayout: 'main', extname: '.hbs' })
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const restaurants = require('./models/restaurants')
const routes  = require('./routes')
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
app.use(routes)

app.listen(port, () => {
  console.log(`App is listening on http://localhost/${port}`)
})
