import express from 'express'
import multer from 'multer'
import {
  getAllData,
  addNewData,
  updateDataUser,
  updateDetailUser,
  deleteData,
  getDataFiltered
} from '../controller/users.js'

const upload = multer({ storage: multer.memoryStorage() })
export const router = express.Router()

// READ - GET
router.get('/', getAllData)

//READ - GET USER LOGGED
router.get('/logged', getDataFiltered)

// CREATE - POST
router.post('/', addNewData)

// UPDATE - PUT
router.put('/:id', updateDataUser)

// EDIT - PATCH
router.patch('/:id', upload.single('image'), updateDetailUser)

// DELETE - DELETE
router.delete('/:id', deleteData)
