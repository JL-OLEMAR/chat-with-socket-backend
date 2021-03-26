const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')

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

    res.json({
      usuario
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

  res.json({
    ok: true,
    msg: 'login',
    email,
    password
  })
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
