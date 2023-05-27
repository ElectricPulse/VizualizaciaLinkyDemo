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

const SQL_UPDATE_SECTOR = `
	UPDATE sectors SET carrier=? where id=?
`

const SQL_FETCH_SECTORS = `
	SELECT * from sectors;
`

function sendStatus(res, code) {
	res.writeHead(500)
	res.end()
}

function handleErr(res, err) {
	if(err) {
		console.error(err)
		sendStatus(res, 500)
		return true
	}

	return false
}

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
				if(handleErr(res, err)) 
					return
		
				res.writeHead(200, {'Content-Type': 'application/json'})
				res.end(JSON.stringify(data))
			})

			break;
		case 'sector':
			if(req.method !== 'POST')
				return

			let body = ''

			req.on('data', function(data) {
				body += data	
			})

			req.on('end', function() {
				const [ sectorId , carrierId ] = JSON.parse(body)
				
				connection.query(SQL_UPDATE_SECTOR, [carrierId, sectorId], (err) => {
					if(handleErr(res, err)) {
						sendStatus(res, 403)
						return
					}

					sendStatus(res, 200)
				})
			})
			break;
		default:
			console.log("Invalid route: ", url[2])

	}
}).listen(8082, function() {
	console.log("Server started")
})
