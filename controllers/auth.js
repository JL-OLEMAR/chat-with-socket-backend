const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {
  try {
    const { email, password } = req.body

    // verificar que el email no exista
    const existeEmail = await Usuario.findOne({ email })
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya existe'
      })
    }

    const usuario = new Usuario(req.body)
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password, salt)

    // Guardar usuario en DB
    await usuario.save()

    // Generar el JWT
    const token = await generarJWT(usuario.id)

    res.json({
      ok: true,
      usuario,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const login = async (req, res = response) => {
  const { email, password } = req.body

  try {
    // Verificar si existe el correo
    const usuarioDB = await Usuario.findOne({ email })
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado'
      })
    }

    // Validar el password
    const validarPassword = bcrypt.compareSync(password, usuarioDB.password)
    if (!validarPassword) {
      return res.status(404).json({
        ok: false,
        msg: 'La contraseña no es correcta'
      })
    }

    // Generar el JWT
    const token = await generarJWT(usuarioDB.id)

    res.json({
      ok: true,
      usuario: usuarioDB,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const renewToken = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew'
  })
}

module.exports = {
  crearUsuario,
  login,
  renewToken
}
