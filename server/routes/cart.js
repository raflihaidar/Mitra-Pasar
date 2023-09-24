import express from 'express'
import {
  addToCart,
  deleteAllCartItem,
  deleteCartItem,
  getCart,
  updateCart,
  createCart,
  getTotalQuantity,
  updateItemQuantity
} from '../controller/cart.js'

export const router = express.Router()

router.get('/', getCart)
router.get('/totalData', getTotalQuantity)
router.post('/', addToCart)
router.patch('/', updateCart)
router.patch('/:id_cart&:id_product', updateItemQuantity)
router.put('/:id', createCart)
router.delete('/:id_cart&:id_product', deleteAllCartItem)
router.delete('/:id_cart&:id_product', deleteCartItem)
