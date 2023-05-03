const express = require('express')
const jajanan_pasarController = require('../controller/jajanan_pasar.js')

const router = express.Router()

// READ - GET
router.get('/', jajanan_pasarController.getJajanan_pasar)

// CREATE - POST
router.post('/', jajanan_pasarController.createNewProduct)

// UPDATE - PATCH
router.put('/:id', jajanan_pasarController.updateData)

// DELETE - DELETE
router.delete('/:id', jajanan_pasarController.deleteProducts)

module.exports = router
