const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { Authenticator } = require('../middleware/auth')

router.use('/restaurants', Authenticator, restaurants)
router.use('/auth', auth)
router.use('/users', users)
router.use('/', Authenticator, home)

module.exports = router