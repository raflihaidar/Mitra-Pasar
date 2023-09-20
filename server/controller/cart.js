import { addData, getData } from '../models/cart.js'

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

export const addToCart = async (req, res) => {
  const { body } = req
  try {
    await addData(body)
    res.json({
      body
    })
  } catch (error) {
    console.log(error)
  }
}
