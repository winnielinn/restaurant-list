const express = require('express')
const passport = require('passport')
const User = require('../../models/User')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

// authenticate requests
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confrimPassword } = req.body

  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('Email was registered!')
        res.render('register', {
          name,
          email,
          password,
          confrimPassword
        })
      } else {
        User.create({ name, email, password })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
})

module.exports = router