const cartModels = require('../models/cart')

const getCart = async (req, res) => {
  const { id } = req.params
  try {
    const [data] = await cartModels.getCart(id)
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
  getCart
}
