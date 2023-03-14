const express = require('express')

const app = express()

app.use('/auth', require('./auth.route'))
app.use('/tests', require('./tests.route'))
app.use('/result', require('./result.route'))
app.use('/checkStudent', require('./check.route'))
app.use('/video', require('./video.route'))
app.use('/photo', require('./photo.route'))

module.exports = app
