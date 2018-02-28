global.MODULES_DIR = __dirname + '/node_modules'
global.CLIENT_DIR = __dirname + '/client'
global.SERVER_DIR = __dirname + '/server'
global.SHARED_DIR = __dirname + '/shared'

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Loki = require('lokijs')
const db = new Loki('db.json')
const game = require('gameloop')()
const ShipData = require(SHARED_DIR + '/ShipData')

app.use('/', express.static(CLIENT_DIR))
app.use('/shared', express.static(SHARED_DIR))
app.use('/libs/socket.io', express.static(MODULES_DIR + '/socket.io-client/dist'))
app.use('/libs/phaser', express.static(MODULES_DIR + '/phaser/dist'))

db.addCollection('command')
db.addCollection('world')

io.on('connection', (socket) => {
	socket.on('join', (data) => {
		let ship = ShipData(socket.id, {...data})
		db.getCollection('world').insert(ship)
		socket.emit('update', db.getCollection('world').find())
	})

	socket.on('command', (data) => {
		db.getCollection('command').insert(data)
	})
})

game.on('update', () => {
 	io.emit('update', db.getCollection('world').find())
})

server.listen(4444)