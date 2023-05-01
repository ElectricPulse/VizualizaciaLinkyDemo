var http = require('http')
var mysql = require('mysql')

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'playground',
	password: 'BMFnu6MhP.m3U'
})

connection.connect(function(err) {
	if(err)
		console.error(err)
	else
		console.log("Connected to database")
})

const SQL_FETCH_SECTORS = `
	SELECT * from sectors;
`

http.createServer(function (req, res) {
	const url = req.url.split('/')

	if(url[1] !== 'api') {
		res.writeHead(404, { 'Content-Type': 'text/plain' })
		res.end()
		return
	}

	switch(url[2]) {
		case 'transporters':
			connection.query(SQL_FETCH_SECTORS, (err, data) => {
				if(err)
					console.error(err)
		
				res.writeHead(200, {'Content-Type': 'application/json'})
				res.end(JSON.stringify(data))
			})

			break;
		default:
			console.log("Invalid route: ", url[2])

	}
}).listen(8082, function() {
	console.log("Server started")
})
