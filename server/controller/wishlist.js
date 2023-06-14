const wishlistModels = require('../models/wishlist')

const getUserWishlist = async (req, res) => {
  const { id } = req.params
  try {
    const [data] = await wishlistModels.getUserWishlist(id)
    res.json({
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}

module.exports = {
  getUserWishlist
}
