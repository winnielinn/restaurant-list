module.exports = {
  Authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'You have to log in first!')
    res.redirect('/users/login')
  }
}