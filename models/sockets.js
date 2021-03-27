
class Sockets {
  constructor (io) {
    this.io = io

    this.socketEvents()
  }

  socketEvents () {
    // On connection
    this.io.on('connection', (socket) => {
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
    })
  }
}

module.exports = Sockets
