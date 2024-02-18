const knex = require('../../bancoDeDados/conexao')

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, categoria_id, tipo } = req.body;
    const { id } = req.usuario;

    try {

        const categoriaExiste = await knex('categorias').where({ id: categoria_id }).first()

        if (!categoriaExiste) return res.status(400).json({ mensagem: 'Categoria não encontrada.' })

        const transacaoCadastrada = await knex('transacoes').insert({
            descricao,
            valor,
            categoria_id,
            tipo,
            usuario_id: id
        }).returning('*')


        return res.status(201).json(transacaoCadastrada)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro do servidor' })
    }
}

module.exports = cadastrarTransacao