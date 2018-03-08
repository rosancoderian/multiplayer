const socket = io.connect('localhost:4444')

socket.on('connect', (data) => {
    socket.emit('join')
})

socket.on('update', (data) => {
    if(data) {
        console.log(data)
    }
})