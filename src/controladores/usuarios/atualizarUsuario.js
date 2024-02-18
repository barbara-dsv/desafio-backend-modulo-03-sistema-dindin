const knex = require('../../bancoDeDados/conexao')
const bcrypt = require('bcrypt')

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const emailJaCadastrado = await knex('usuarios').where({ email }).andWhereNot({ id: req.usuario.id }).first();

        if (emailJaCadastrado) {
            return res.status(400).json({
                mensagem: 'Email informado já pertence a outra conta.'
            })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuarioAtulizado = await knex('usuarios').where({ id: req.usuario.id }).update({
            nome,
            email,
            senha: senhaCriptografada
        })

        if (!usuarioAtulizado) {
            return res.status(400).json({
                mensagem: 'O usuario não foi atualizado.'
            })
        }

        return res.status(200).json({
            mensagem: 'Usuário atualizado com sucesso.'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro do servidor' })
    }
}

module.exports = atualizarUsuario
