const { usuarioConectado, usuarioDesconectado } = require('../controllers/sockets')
const { comprobarJWT } = require('../helpers/jwt')

class Sockets {
  constructor (io) {
    this.io = io

    this.socketEvents()
  }

  socketEvents () {
    // On connection
    this.io.on('connection', async (socket) => {
      const [valido, uid] = comprobarJWT(socket.handshake.query['x-token'])

      if (!valido) {
        console.log('socket no identificado')
        return socket.disconnect()
      }

      await usuarioConectado(uid)

      // TODO: Validar el JWT
      // Si el token no es válido, desconectar

      // TODO: Saber que usuario está activo mediante el UID

      // TODO: Emitir los usuarios conectados

      // TODO: Socket join, uid

      // TODO: Escuchar cuando el cliente manda un mensaje
      // mensaje-personal

      // TODO: disconnect
      // Marcar en la DB que el usuario se desconecto
      // TODO: Emitir todos los usuarios conectados
      socket.on('disconnect', async () => {
        await usuarioDesconectado()
      })
    })
  }
}

module.exports = Sockets
