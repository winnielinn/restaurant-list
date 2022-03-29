const express = require('express')
const passport = require('passport')
const router = express.Router()

const userController = require('../../controller/user-controller')

router.get('/login', userController.logInPage)

// authenticate requests
router.post('/login', passport.authenticate('local', {
  successRedirect: '/restaurants',
  failureRedirect: '/users/login',
  failureMessage: true,
  failureFlash: true
}))

router.get('/register', userController.registerPage)
router.post('/register', userController.register)
router.get('/logout', userController.logOut)

module.exports = router