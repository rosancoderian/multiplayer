global.MODULES_DIR = __dirname + '/node_modules'
global.CLIENT_DIR = __dirname + '/client'
global.SERVER_DIR = __dirname + '/server'
global.SHARED_DIR = __dirname + '/shared'
global.IS_BROWSER = typeof window !== 'undefined'

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Loki = require('lokijs')
const db = new Loki('db.json')
const game = require('gameloop')({ fps: 30 })
const ShipData = require('./shared/ShipData')
const CommandData = require('./shared/CommandData')
const ShipLogic = require('./server/ShipLogic')

app.use('/', express.static(CLIENT_DIR))
app.use('/shared', express.static(SHARED_DIR))
app.use('/libs/socket.io', express.static(MODULES_DIR + '/socket.io-client/dist'))
app.use('/libs/phaser', express.static(MODULES_DIR + '/phaser/dist'))

let commandsColl = db.addCollection('command')
let shipsColl = db.addCollection('ship', { autoupdate: true })

io.on('connection', (socket) => {
	socket.on('join', (data) => {
		shipsColl.insert(ShipData({ ...data, id: socket.id }))
	})
	socket.on('command', (data) => {
		commandsColl.insert(CommandData({ ...data, id: socket.id }))
	})
	socket.on('disconnect', () => {
		shipsColl.remove({ id: socket.id })
		io.emit('disconnect', { id: socket.id })
	})
})

game.on('update', () => {
	let command = commandsColl.findOne()
	let ships = shipsColl.find()
	if(command) {
		ships = ships.map((ship) => {
			switch (command.type) {
				case 'LEFT':
					ship.x--
					break
				case 'RIGHT':
					ship.x++
					break
				case 'UP':
					ship.y++
					break
				case 'DOWN':
					ship.y--
					break
			}
			return ship
		})
		commandsColl.remove(command)
	}
	io.emit('update', {
		ships: shipsColl.find()
	})
})
game.start()

server.listen(4444) 