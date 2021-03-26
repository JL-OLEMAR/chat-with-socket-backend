const jwt = require('jsonwebtoken')

/*
    ojo: NO poner en el JWT información valiosa del usuario
    solo la necesaria
*/
const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid }

    jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '24h'
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject('No se pudo generar el JWT') // eslint-disable-line
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = {
  generarJWT
}
