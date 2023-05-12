const express = require('express')
const userController = require('../controller/user.js')

const router = express.Router()

// READ - GET
router.get('/', userController.getUser)

// CREATE - POST
router.post('/', userController.createNewUser)

// UPDATE - PATCH
router.put('/:id', userController.updateData)

// DELETE - DELETE
router.delete('/:id', userController.deleteUser)

module.exports = router
