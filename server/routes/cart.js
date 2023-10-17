import express from 'express'
import {
  addToCart,
  deleteAllCartItem,
  getCart,
  updateCart,
  createCart,
  getTotalQuantity,
  updateCartItem,
  updateCheckBox,
  selectedItem
} from '../controller/cart.js'

export const router = express.Router()

router.get('/', getCart)
router.get('/totalData', getTotalQuantity)
router.get('/shipment', selectedItem)
router.post('/', addToCart)
router.patch('/', updateCart)
router.patch('/isChecked/:id_cart&:id_product', updateCheckBox)
router.patch('/:id_cart&:id_product', updateCartItem)
router.put('/:id', createCart)
router.delete('/:id_cart&:id_product', deleteAllCartItem)
