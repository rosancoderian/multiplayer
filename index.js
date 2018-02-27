const MODULES_DIR = __dirname + '/node_modules'
const CLIENT_DIR = __dirname + '/client'
const SERVER_DIR = __dirname + '/server'
const SHARED_DIR = __dirname + '/shared'

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use('/', express.static(CLIENT_DIR))
app.use('/shared', express.static(SHARED_DIR))
app.use('/libs/socket.io', express.static(MODULES_DIR + '/socket.io-client/dist'))
app.use('/libs/phaser', express.static(MODULES_DIR + '/phaser/dist'))

io.on('connection', (client) => {
    console.log('client connected...')
    client.on('join', (data) => {
        console.log(data)
    })
})

server.listen(4444)