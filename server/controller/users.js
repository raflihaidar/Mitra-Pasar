import {
  getUser,
  createNewUser,
  updateData,
  updateProfileUser,
  deleteUser
} from '../models/users.js'
import { v4 as uuid } from 'uuid'

import { createData } from '../models/cart.js'

export const getAllData = async (req, res) => {
  try {
    const [data] = await getUser()
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

export const addNewData = async (req, res) => {
  const { body } = req
  const id = uuid()
  try {
    await createNewUser(body, id)
    await createData(id)
    res.status(201).json({
      message: 'CREATE NEW USER SUCCESS',
      data: body,
      id
    })
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }
}

export const updateDataUser = async (req, res) => {
  const { id } = req.params
  const { body } = req
  try {
    await updateData(body, id)
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
export const updateDetailUser = async (req, res) => {
  const { id } = req.params
  const { body, file } = req
  try {
    await updateProfileUser(body, file, id)
    res.json({
      message: 'Update User Success',
      body,
      file
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
    await deleteUser(id)
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
