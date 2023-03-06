require('dotenv').config()
const express = require('express')
const http = require('http')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(logger('dev'))
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use('/api', require('./router/index'))

const server = http.createServer(app)

server.listen(PORT, () => console.log(`Start server in port ${PORT}`))
