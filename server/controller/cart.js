import { getData } from '../models/cart.js'

export const getCart = async (req, res) => {
  const { id } = req.query
  try {
    const [data] = await getData(id)
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
