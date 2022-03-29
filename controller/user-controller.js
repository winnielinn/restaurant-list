const bcrypt = require('bcryptjs')
const User = require('../models/User')

const userController = {
  logInPage: (req, res) => {
    res.render('login')
  },
  registerPage: (req, res) => {
    res.render('register')
  },
  register: (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []

    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: 'All items are required' })
    }

    if (password !== confirmPassword) {
      errors.push({ message: 'Please check your password again' })
    }

    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }

    User.findOne({ email })
      .then(user => {
        if (user) {
          errors.push({ message: 'Email was registered!' })
          res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
          })
        } else {
          bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then(user => {
              req.login(user, () => {
                  res.redirect('/')
              })
            })
        }
      })
      .catch(err => console.log(err))
  },
  logOut: (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are successfully logged out.')
    res.redirect('/users/login')
  }
}

module.exports = userController