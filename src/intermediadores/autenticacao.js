const jwt = require('jsonwebtoken')
const senhaJwt = require('../senhaJwt')
const pool = require('../conexao')

const verificarUsuario = async (req, res, next) => {
    const { authorization } = req.headers;

    const token = authorization.split(' ')[1]
    if (!token) return res.status(401).json({ message: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    try {
        const { id } = jwt.verify(token, senhaJwt)

        const { rows, rowCount } = await pool.query('select * from usuarios where id = $1', [id])
        if (rowCount < 1) return res.status(401).json({ mensagem: 'Não autorizado' })

        req.usuario = rows[0]

        next()

    } catch (error) {
        return res.status(401).json({ mensagem: 'Não autorizado' })
    }
}

module.exports = verificarUsuario