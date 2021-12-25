
const jwt = require('jsonwebtoken')

exports.signAccessToken = (user) => {

    const playoad = {
        aud: user.id,
        iss: 'ElectronicStore.com',
    }

    return jwt.sign(playoad, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1d' })
}