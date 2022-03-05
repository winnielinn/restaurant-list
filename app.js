const express = require('express')
const exphbs = require('express-handlebars').create({ defaultLayout: 'main', extname: '.hbs' })
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

const routes = require('./routes')
const usePassport = require('./config/passport')
const app = express()
const port = 3000
require('./config/mongoose')

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
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

app.listen(port, () => {
  console.log(`App is listening on http://localhost/${port}`)
})
