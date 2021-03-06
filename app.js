const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const users = require('./routes/users')

const app = express()
mongoose.connect('mongodb://localhost/nodeapi')
mongoose.Promise = global.Promise

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

// Routes
app.use('/users', users)

// Catch 404 Errors and forward them to error handlers
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    // Respond to client
    res.status(status).json({
        error: {
            message : error.message
        }
    })

    // Respond to ourselves
    console.error(err)
})

// Start the server
const port = app.get('port') || 3000
app.listen(port, () => console.log('Server start on port ', port))