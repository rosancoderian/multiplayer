module.exports = CommandData

function CommandData (data = {}) {
    const base = {
        id: false,
        type: false,
        timestamp: false
    }
    return { ...base, ...data }
}