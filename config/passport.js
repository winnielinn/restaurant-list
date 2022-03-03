const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/User')

module.exports = (app) => {
  // middleware
  app.use(passport.initialize())
  app.use(passport.session())

  // passport-local
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) return done(null, false)
        if (user.password !== password) return done(null, false)
        return done(null, user)
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
