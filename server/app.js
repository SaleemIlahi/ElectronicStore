
const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./api/db/connectdb.js')

const app = express()

// .env config
dotenv.config({ path: 'server/config/config.env' })

// Connecting Databse
connectDB()




// port config
const port = process.env.PORT

// Server Listening
app.listen(port, () => console.log(`Server Listening at http://localhost:${port}`))