
const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./api/db/connectdb.js')
const userRouter = require('./api/routes/user_routes.js')
const productRouter = require('./api/routes/product_routes.js')
const { errorHandler } = require('./api/middlewares/errorHandler.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())

// .env config
dotenv.config({ path: 'server/config/config.env' })

app.use(express.json())
app.use(cookieParser())

// Setup the template Engine to use
app.set('view engine','ejs')

// Connecting Databse
connectDB()

// loading user Router
app.use('/',userRouter)
app.use('/',productRouter)
app.use(errorHandler)

// Serve static file in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join("client/build")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client","build", "index.html"));
    });
  }

// port config
const port = process.env.PORT || 8000

// Server Listening
app.listen(port, () => console.log(`Server Listening at http://localhost:${port}`))