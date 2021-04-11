const jwt = require('jsonwebtoken')

/*
    ojo: NO poner en el JWT información valiosa del usuario
    solo el campo necesario a identificarlo
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

const comprobarJWT = (token = '') => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY)
    return [true, uid]
  } catch (error) {
    return [false, null]
  }
}

module.exports = {
  generarJWT,
  comprobarJWT
}
