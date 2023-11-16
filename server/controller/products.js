import {
  getAllProducts,
  getSingleProduct,
  addNewProduct,
  updateProduct,
  updateSingleProduct,
  deleteProduct,
  getProductByCategory,
  searchProducts
} from '../models/products.js'

export const getAllData = async (req, res) => {
  const { query } = req
  try {
    console.log(query)
    let data
    if (Object.keys(query).length === 0) {
      ;[data] = await getAllProducts()
    } else {
      ;[data] = await getProductByCategory(query)
    }
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
    console.log(body)
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
    console.log(body)
  }
}

export const updateData = async (req, res) => {
  const { id } = req.params
  const { body, file } = req
  try {
    await updateProduct(body, file, id)
    console.log(body)
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
    console.log(body)
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

export const searchProductData = async (req, res) => {
  const { query } = req
  try {
    let [data] = await searchProducts(query)
    res
      .json({
        message: 'Search Products Success',
        data
      })
      .status(200)
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}
