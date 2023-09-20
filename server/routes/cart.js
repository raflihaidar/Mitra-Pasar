import express from 'express'
import { addToCart, getCart } from '../controller/cart.js'

export const router = express.Router()

router.get('/', getCart)
router.put('/', addToCart)
