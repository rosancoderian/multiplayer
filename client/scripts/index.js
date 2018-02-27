const socket = io.connect('localhost:4444')
socket.on('connect', (data) => {
    socket.emit('join', 'Hello World from client')
 })

new Phaser.Game()