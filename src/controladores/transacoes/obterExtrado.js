const knex = require('../../bancoDeDados/conexao')

const obterExtrato = async (req, res) => {
    const { id } = req.usuario
    try {

        const transacoes = await knex('transacoes').where({ usuario_id: id }).first()
        if (!transacoes) return res.status(404).json({ mensagem: 'Transação não encontrada ou não pertence a este usuário' })

        if (transacoes) {
            const entrada = await knex('transacoes').where({ usuario_id: id, tipo: 'entrada' }).sum('valor as entrada')
            const saida = await knex('transacoes').where({ usuario_id: id, tipo: 'saída' }).sum('valor as saída')
            const resposta = { entrada: entrada[0].entrada || 0, saída: saida[0].saída || 0 }
            return res.status(200).json(resposta)
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro do servidor' })
    }
}

module.exports = obterExtrato