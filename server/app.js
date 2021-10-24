require('dotenv').config()

// DB connection
require('./config/db.config')

// Debug
require('./config/debug.config')

// App
const express = require('express')
const app = express()

// App settings
require('./config/cors.config')(app)
require('./config/session.config')(app)
require('./config/middleware.config')(app)
require('./config/locals.config')(app)
require('./config/uploadFile.config')

// Routes index
require('./routes')(app)

// Error handling
require('./config/error-handlers.config')(app)

app.use((req, res) => res.sendFile(__dirname + "/public/index.html"));

module.exports = app