const knex = require('../../bancoDeDados/conexao')

const listarCategorias = async (req, res) => {
    try {

        const categorias = await knex('categorias')

        if (categorias.length === 0) return res.status(404).json({ mensagem: 'Nenhuma categoria encotrada' })

        return res.status(200).json(categorias)
    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
}
module.exports = listarCategorias