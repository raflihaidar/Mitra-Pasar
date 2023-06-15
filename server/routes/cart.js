const express = require('express')
const cartController = require('../controller/cart')

const router = express.Router()

router.get('/:id', cartController.getCart)

module.exports = router
