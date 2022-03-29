const express = require('express')
const router = express.Router()

const restController = require('../../controller/restaurant-controller')

router.get('/', restController.getRestaurants)
router.get('/new', restController.createRestaurant)
router.post('/', restController.postRestaurant)
router.get('/:id', restController.getRestaurant)
router.get('/:id/edit', restController.editRestaurant)
router.put('/:id', restController.putRestaurantt)
router.delete('/:id', restController.deleteRestaurantt)


module.exports = router