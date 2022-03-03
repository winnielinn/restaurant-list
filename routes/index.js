const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurans')
const users = require('./modules/users')
const { Authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/restaurants', Authenticator, restaurants)
router.use('/', Authenticator, home)

module.exports = router