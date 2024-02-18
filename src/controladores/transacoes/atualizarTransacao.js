const knex = require('../../bancoDeDados/conexao')

const atualizarTransacao = async (req, res) => {
    const { id: idTransacao } = req.params
    const { descricao, valor, categoria_id, tipo } = req.body
    const { id } = req.usuario

    try {
        const transacaoEncontrada = await knex('transacoes').where({ id: idTransacao, usuario_id: id }).first()

        if (!transacaoEncontrada) return res.status(404).json({ mensagem: 'Transação não encontrada ou não pertence a este usuário' })

        const categoriaExiste = await knex('categorias').where({ id: categoria_id }).first()

        if (!categoriaExiste) return res.status(400).json({ mensagem: 'Categoria não encontrada.' })

        await knex('transacoes').where({ usuario_id: id }).update({
            descricao,
            valor,
            categoria_id,
            tipo
        })

        return res.status(201).send()

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro do servidor' })
    }
}

module.exports = atualizarTransacao