import express from 'express'
import { getAllData } from '../controller/category.js'

export const router = express.Router()

router.get('/', getAllData)
