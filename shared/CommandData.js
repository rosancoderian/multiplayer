function CommandData (id, opt) {
    return {
        id,
        type: 'command',
        timestamp: opt.timestamp
    }
}

if (!(typeof window === "undefined")) module.exports = CommandData;
