const express = require('express')
const wishlistController = require('../controller/wishlist')

const router = express.Router()

router.get('/:id', wishlistController.getUserWishlist)

module.exports = router
