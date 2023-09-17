import express from 'express'
import { getCart } from '../controller/cart.js'

export const router = express.Router()

router.get('/', getCart)
