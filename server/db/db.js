const { Pool } = require('pg')

const db = new Pool({
	database: process.env.DB_NAME,
	port: Number(process.env.DB_POST),
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
})
db.connect(err => {
	if (err) {
		return console.log(`Error db ${err}`)
	}
	console.log('Connect DB')
})

module.exports = db
