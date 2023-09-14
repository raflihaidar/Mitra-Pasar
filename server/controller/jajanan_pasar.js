import {
  getAllProducts,
  getSingleProduct,
  addNewProduct,
  updateProduct,
  updateSingleProduct,
  deleteProduct
} from '../models/jajanan_pasar.js'

export const getAllData = async (req, res) => {
  try {
    const [data] = await getAllProducts()
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

export const getDetailProducts = async (req, res) => {
  const { id } = req.params
  try {
    const [data] = await getSingleProduct(id)
    res.json({
      data
    })
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}

export const addNewData = async (req, res) => {
  const { body, file } = req
  try {
    await addNewProduct(body, file)
    res.redirect('http://127.0.0.1:5173/admin')
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}

export const updateData = async (req, res) => {
  const { id } = req.params
  const { body, file } = req
  try {
    await updateProduct(body, file, id)
    console.log(file)
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}
export const updateSingleData = async (req, res) => {
  const { id } = req.params
  const { body } = req
  try {
    await updateSingleProduct(body, id)
    res.json({
      message: 'Update Products Success',
      data: body
    })
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}

export const deleteData = async (req, res) => {
  const { id } = req.params
  try {
    await deleteProduct(id)
    res.json({
      message: 'Delete Products Success',
      data: {
        id: '1',
        name: 'Dadar Gulung',
        price: 3000
      }
    })
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}
