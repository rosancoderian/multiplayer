global.MODULES_DIR = __dirname + '/node_modules'
global.CLIENT_DIR = __dirname + '/client'
global.SERVER_DIR = __dirname + '/server'
global.SHARED_DIR = __dirname + '/shared'
global.SERVER = typeof window == 'undefined'
global.is = x => typeof x !== 'undefined'
global.log = console.log

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const Loki = require('lokijs')
const db = new Loki('db.json')
const game = require('gameloop')({ fps: 30 })
const ShipData = require('./shared/ShipData')
const CommandData = require('./shared/CommandData')
const ShipLogic = require('./server/ShipLogic')
const timel = require('@gamestdio/timeline')

app.use('/', express.static(CLIENT_DIR))
app.use('/shared', express.static(SHARED_DIR))
app.use('/libs/socket.io', express.static(MODULES_DIR + '/socket.io-client/dist'))
app.use('/libs/phaser', express.static(MODULES_DIR + '/phaser/dist'))

let timeline = timel.createTimeline(100)
let commands = [];

io.on('connection', (socket) => {
	socket.on('join', (data) => {

	})
	socket.on('command', (data) => {
		commands.push(data)
	})
	socket.on('disconnect', () => {
		io.emit('disconnect', { id: socket.id })
	})
})

game.on('update', () => {
	command = commands.shift()
	io.emit('update', {})
})
game.start()

server.listen(4444)