const express = require('express')
const exphbs = require('express-handlebars').create({ defaultLayout: 'main', extname: '.hbs' })
const methodOverride = require('method-override')
const session = require('express-session')
const routes = require('./routes')
const app = express()
const usePassport = require('./config/passport')
require('./config/mongoose')

const port = 3000

app.engine('hbs', exphbs.engine)
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
  secret: 'secretCode',
  resave: true,
  saveUninitialized: false,
}))
app.use(express.json())
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)

app.listen(port, () => {
  console.log(`App is listening on http://localhost/${port}`)
})
