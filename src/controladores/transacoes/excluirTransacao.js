const knex = require('../../bancoDeDados/conexao')

const excluirTransacao = async (req, res) => {
    const { id: idTransacao } = req.params
    const { id } = req.usuario
    try {
        const transacaoEncontrada = await knex('transacoes').where({ id: idTransacao, usuario_id: id }).first()

        if (!transacaoEncontrada) return res.status(404).json({ mensagem: 'Transação não encontrada ou não pertence a este usuário' })

        await knex('transacoes').where({ id: idTransacao }).del()

        return res.status(201).send()

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro do servidor' })
    }
}
module.exports = excluirTransacao