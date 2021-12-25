
const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./api/db/connectdb.js')
const userRouter = require('./api/routes/user_routes.js')
const { errorHandler } = require('./api/middlewares/errorHandler.js')
const cookieParser = require('cookie-parser')

const app = express()

// .env config
dotenv.config({ path: 'server/config/config.env' })

app.use(express.json())
app.use(cookieParser())

// Connecting Databse
connectDB()

// loading user Router
app.use('/',userRouter)
app.use(errorHandler)



// port config
const port = process.env.PORT

// Server Listening
app.listen(port, () => console.log(`Server Listening at http://localhost:${port}`))