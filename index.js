// require('./db');
const connectToMongo = require('./db')
const express = require('express')

var cors = require('cors') 

connectToMongo()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/user', require('./routes/user'))
app.use('/product', require('./routes/products'))
app.use('/cart', require('./routes/Cart'))



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
