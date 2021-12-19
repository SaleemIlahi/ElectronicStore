
const express = require('express')
const app = express()

// port config
const port = process.env.PORT || 8000

// Server Listening
app.listen(port, () => console.log(`Server Listening at http://localhost:${port}`))