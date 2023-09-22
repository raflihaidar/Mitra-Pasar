import express from 'express'
import { addToCart, getCart, updateCart } from '../controller/cart.js'
import { createData } from '../models/cart.js'

export const router = express.Router()

router.get('/', getCart)
router.put('/', addToCart)
router.patch('/', updateCart)
router.put('/:id', createData)
