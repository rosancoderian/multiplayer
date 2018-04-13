if(is(SERVER)) {
    module.exports = ShipData
}

function ShipData(data = {}) {
    const base = {
        id: false,
        x: 0,
        y: 0,
        health: 100,
        name: false
    };
    return { ...base, ...data };
}