module.exports = function getUserFromToken(req) {
    return new Promise((resolve, reject) => {
        resolve({ name: 'Vijay' })
    })
}