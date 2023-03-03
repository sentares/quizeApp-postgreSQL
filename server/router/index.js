const express = require('express')

const app = express()

app.use('/auth', require('./auth.route'))
app.use('/tests', require('./tests.route'))

module.exports = app
