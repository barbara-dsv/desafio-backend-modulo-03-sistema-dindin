const pool = require('../../conexao')
const bcrypt = require('bcrypt')

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    const { id } = req.usuario

    try {
        const { rows } = await pool.query('select * from usuarios where email =$1', [email])

        if (rows.length > 0) {
            return res.status(404).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const atualizacaoDoUsuario = await pool.query('update usuarios SET nome = $1, email = $2, senha = $3 where id = $4', [nome, email, senhaCriptografada, id])

        return res.status(201).send()
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro do servidor' })
    }
}

module.exports = atualizarUsuario
