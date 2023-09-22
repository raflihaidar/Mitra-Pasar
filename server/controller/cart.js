import { addData, createData, getData, updateData } from '../models/cart.js'

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

export const createCart = async (req, res) => {
  const { id } = req.params
  try {
    await createData(id)
    res.status(200)
  } catch (error) {
    console.log(error)
    console.log(id)
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
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}

export const updateCart = async (req, res) => {
  const { body } = req
  try {
    await updateData(body)
    res.json({
      message: 'Update data success'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}
