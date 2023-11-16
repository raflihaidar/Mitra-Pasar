import express from 'express'
import multer from 'multer'
import {
  addNewData,
  deleteData,
  getAllData,
  getDetailProducts,
  searchProductData,
  updateData,
  updateSingleData
} from '../controller/products.js'

const upload = multer({ storage: multer.memoryStorage() })
export const router = express.Router()

// READ - GET
router.get('/', getAllData)

//READ - GET DETAIL PRODUCTS
router.get('/detail/:id', getDetailProducts)

//SEARCH DATA BY KEYWORD
router.get('/search', searchProductData)

// CREATE - POST
router.post('/', upload.single('image'), addNewData)

// UPDATE - PATCH
router.put('/:id', upload.single('image'), updateData)

//UPDATE
router.patch('/:id', updateSingleData)

// DELETE - DELETE
router.delete('/:id', deleteData)
