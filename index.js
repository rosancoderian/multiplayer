global.MODULES_DIR = __dirname + '/node_modules'
global.CLIENT_DIR = __dirname + '/client'
global.SERVER_DIR = __dirname + '/server'
global.SHARED_DIR = __dirname + '/shared'
global.IS_BROWSER = !typeof window === 'undefined'

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Loki = require('lokijs')
const db = new Loki('db.json')
const game = require('gameloop')({ fps: 30 })
const ShipData = require('./shared/ShipData')
const CommandData = require('./shared/CommandData')

app.use('/', express.static(CLIENT_DIR))
app.use('/shared', express.static(SHARED_DIR))
app.use('/libs/socket.io', express.static(MODULES_DIR + '/socket.io-client/dist'))
app.use('/libs/phaser', express.static(MODULES_DIR + '/phaser/dist'))

let commands = db.addCollection('command')
let ships = db.addCollection('ship')

io.on('connection', (socket) => {
	socket.on('join', (data) => {
		ships.insert(ShipData({ ...data, id: socket.id }))
	})
	socket.on('command', (data) => {
		commands.insert(CommandData({ ...data, id: socket.id }))
	})
})

game.on('update', () => {
	io.emit('update', {
		ships: ships.find()
	})
})
game.start()

server.listen(4444) 