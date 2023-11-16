import express from 'express'
import cors from 'cors'
import 'dotenv/config'
const PORT = process.env.PORT || 4000
import { router as jajanan_pasar_routes } from './routes/products.js'
import { router as users_routes } from './routes/users.js'
import { router as cart_routes } from './routes/cart.js'
import { router as category_router } from './routes/category.js'
import { logRequest } from './middleware/logs.js'

const app = express()
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }))
app.use(logRequest)
app.use(express.json())
app.use('/products', jajanan_pasar_routes)
app.use('/users', users_routes)
app.use('/cart', cart_routes)
app.use('/category', category_router)

app.listen(PORT, () => {
  console.log(`server ready di localhost ${PORT}`)
})
