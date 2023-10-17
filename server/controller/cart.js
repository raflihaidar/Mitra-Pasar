import {
  addData,
  getTotalData,
  createData,
  deleteAllData,
  getData,
  updateData,
  updateCheckedStatus,
  updateItem,
  selectedData
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

export const selectedItem = async (req, res) => {
  const { id_cart } = req.query
  try {
    const [data] = await selectedData(id_cart)
    res
      .json({
        message: 'Get selected data success',
        data,
        id_cart
      })
      .status(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}

export const updateCheckBox = async (req, res) => {
  const { id_cart, id_product } = req.params
  try {
    await updateCheckedStatus(id_cart, id_product)
    res.json({
      message: 'update checkbox success'
    })
  } catch (error) {
    res.status(404).json({
      id_cart,
      id_product,
      message: 'Server error',
      serverMessage: error
    })
  }
}

export const updateCartItem = async (req, res) => {
  const { id_cart, id_product } = req.params
  const { quantity } = req.body
  try {
    const [data] = await updateItem(id_cart, id_product, quantity)
    res.json({
      message: 'Update  quantity success',
      data
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
