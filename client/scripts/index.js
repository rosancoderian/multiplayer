const socket = io.connect('localhost:4444')
let world = [];

socket.on('connect', (data) => {
    socket.emit('join', ShipData({
        name: 'kapal',
    }))
})

socket.on('update', (data) => {
    world = data
    console.log(world)
})

const game = new Phaser.Game({
    width: 500,
    height: 500,
    scene: {
        preload,
        create,
        update
    }
})

function preload () {
    this.load.image('ship1', '/images/ship1.png')
}

function create () {
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
}

function update () {
    if(this.keyLeft.isDown) {
        socket.emit('command', {
            type: 'LEFT',
            timestamp: Date.now()
        })
    }
    if(this.keyRight.isDown) {
        socket.emit('command', {
            type: 'RIGHT',
            timestamp: Date.now()
        })
    }
    if(this.keyUp.isDown) {
        socket.emit('command', {
            type: 'UP',
            timestamp: Date.now()
        })
    }
    if(this.keyDown.isDown) {
        socket.emit('command', {
            type: 'DOWN',
            timestamp: Date.now()
        })
    }
}

game.start()