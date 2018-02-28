function ShipData (id, opt = {}) {
  return {
    id,
    type: 'ship',
    name: opt.name || null,
    health: opt.health || null,
    name: opt.name || null,
    x: opt.x || 0,
    y: opt.y || 0
  }
}

if(!(typeof window === 'undefined')) module.exports = ShipData