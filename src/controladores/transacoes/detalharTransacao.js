const knex = require('../../bancoDeDados/conexao')

const detalharTransacao = async (req, res) => {
    const { id: idTransacao } = req.params
    const { id } = req.usuario

    try {
        const transacao = await knex('transacoes').where({ id: idTransacao, usuario_id: id }).first()

        if (!transacao) return res.status(404).json({ mensagem: 'Transação não encontrada ou não pertence a este usuário' })

        return res.status(200).json(transacao)

    } catch (error) {
        return res.status(401).json({ mensagem: 'Error interno do servidor' })
    }

}

module.exports = detalharTransacao 