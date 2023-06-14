const express = require('express')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 4000
const jajanan_pasar_routes = require('./routes/jajanan_pasar.js')
const user_routes = require('./routes/user.js')
const wishlist_routes = require('./routes/wishlist.js')
const logsMiddleware = require('./middleware/logs.js')

const app = express()

app.use(cors({ methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }))
app.use(logsMiddleware)
app.use(express.json())
app.use('/jajanan_pasar', jajanan_pasar_routes)
app.use('/user', user_routes)
app.use('/wishlist', wishlist_routes)

app.listen(PORT, () => {
  console.log(`server ready di localhost ${PORT}`)
})
