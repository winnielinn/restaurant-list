const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = (app) => {
  // middleware
  app.use(passport.initialize())
  app.use(passport.session())

  // passport-local
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) return done(null, false, req.flash('warning_msg', 'Email is not existed!' ))
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) return done(null, false, req.flash('warning_msg', 'Password is not correct!' ))
            return done(null, user)
          })
      })
      .catch(err => done(err))
  }))

  // sessions
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err))
  })
}
