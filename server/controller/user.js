const userModels = require('../models/user')

const getUser = async (req, res) => {
  try {
    const [data] = await userModels.getUser()
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

const createNewUser = async (req, res) => {
  const { body } = req
  try {
    await userModels.createNewUser(body)
    res.status(201).json({
      message: 'CREATE NEW USER SUCCESS',
      data: body
    })
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}

const updateData = async (req, res) => {
  const { id } = req.params
  const { body } = req
  try {
    await userModels.updateData(body, id)
    res.json({
      message: 'Update User Success',
      data: body
    })
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    await userModels.deleteUser(id)
    res.json({
      message: 'Delete User Success',
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

module.exports = {
  getUser,
  createNewUser,
  updateData,
  deleteUser
}
