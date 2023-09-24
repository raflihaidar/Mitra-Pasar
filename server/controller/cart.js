import {
  addData,
  getTotalData,
  createData,
  deleteAllData,
  deleteData,
  getData,
  updateData,
  updateQuantity
} from '../models/cart.js'

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

export const getTotalQuantity = async (req, res) => {
  const { id } = req.query
  try {
    const [data] = await getTotalData(id)
    res.status(200).json({
      data
    })
  } catch (error) {
    res.status(500)
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

export const updateItemQuantity = async (req, res) => {
  const { id_cart, id_product } = req.params
  const { quantity } = req.body
  try {
    await updateQuantity(id_cart, id_product, quantity)
    res.json({
      message: 'Update  quantity success'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}

export const deleteAllCartItem = async (req, res) => {
  const { id_cart, id_product } = req.params
  try {
    await deleteAllData(id_cart, id_product)
    res.status(200).json({
      message: 'Delete All Data Success'
    })
  } catch (error) {
    res.status(500).json({
      message: 'ERROR'
    })
  }
}

export const deleteCartItem = async (req, res) => {
  const { id_cart, id_product } = req.params
  try {
    await deleteData(id_cart, id_product)
    res.status(200).json({
      message: 'delete cart item success'
    })
  } catch (error) {
    res.status(500)
  }
}
