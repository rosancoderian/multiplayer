if(!IS_BROWSER) {
    module.exports = {
        left,
        right,
        up,
        down,
        update
    }
}

function left (shipData) {
    return Object.assign(shipData, { x: shipData.x - 1 })
}

function right (shipData) {
    return Object.assign(shipData, { x: shipData.x + 1 })
}

function up (shipData) {
    return Object.assign(shipData, { y: shipData.y + 1 })
}

function down (shipData) {
    return Object.assign(shipData, { y: shipData.y - 1 })
}

function update (shipData, command) {
    if(!(shipData && command)) {
        return { ...shipData }
    }
    if(shipData.id == command.id) {
        switch (command.type) {
            case 'LEFT':
                return left(shipData)
                break
            case 'RIGHT':
                return right(shipData)
                break
            case 'UP':
                return up(shipData)
                break
            case 'DOWN':
                return down(shipData)
                break
            default:
                return Object.assign({}, shipData)
        }
    }
    return { ...shipData }
}