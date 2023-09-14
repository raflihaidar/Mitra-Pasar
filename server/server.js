import express from 'express'
import cors from 'cors'
import 'dotenv/config'
const PORT = process.env.PORT || 4000
import { router as jajanan_pasar_routes } from './routes/jajanan_pasar.js'
import { logRequest } from './middleware/logs.js'
// const user_routes = require('./routes/user.js')
// const wishlist_routes = require('./routes/wishlist.js')
// const cart_routes = require('./routes/cart.js')

const app = express()
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }))
app.use(logRequest)
app.use(express.json())
app.use('/jajanan_pasar', jajanan_pasar_routes)
// app.use('/user', user_routes)
// app.use('/wishlist', wishlist_routes)
// app.use('/cart', cart_routes)

app.listen(PORT, () => {
  console.log(`server ready di localhost ${PORT}`)
})
