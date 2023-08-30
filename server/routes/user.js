const express = require('express')
const userController = require('../controller/user.js')

const router = express.Router()

// READ - GET
router.get('/', userController.getUser)

// CREATE - POST
router.post('/', userController.createNewUser)

// UPDATE - PUT
router.put('/:id', userController.updateData)

// EDIT - PATCH
router.patch('/:id', userController.updateProfileUser)

// DELETE - DELETE
router.delete('/:id', userController.deleteUser)

module.exports = router
