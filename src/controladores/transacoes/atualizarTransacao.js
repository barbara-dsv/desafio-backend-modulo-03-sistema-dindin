const pool = require('../../conexao')

const atualizarTransacao = async (req, res) => {
    const { id: idTransacao } = req.params
    const { descricao, valor, categoria_id, tipo } = req.body
    const { id } = req.usuario

    if (!descricao || !valor || !categoria_id || !tipo) return res.status(400).json({ message: "Todos os campos obrigatórios devem ser informados." })

    if (tipo != "entrada" && tipo != "saida") return res.status(400).json({ message: "O campo 'tipo' deve ser 'entrada' ou 'saida'." })
    try {
        const { rows: transacaoEncontrada } = await pool.query('select * from transacoes where id = $1 and usuario_id = $2', [idTransacao, id])
        if (transacaoEncontrada.length === 0) return res.status(400).json({ mensagem: 'Transação não encontrada.' })

        const { rows: categoriaExistente } = await pool.query('select * from categorias where id = $1', [categoria_id])
        if (categoriaExistente.length === 0) return res.status(400).json({ mensagem: 'Categoria não encontrada.' })

        const atualizacaoDaTransacao = await pool.query('update transacoes set descricao = $1, valor = $2, categoria_id = $3, tipo = $4 where id = $5 and usuario_id = $6', [descricao, valor, categoria_id, tipo, idTransacao, id])

        return res.status(201).send()

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro do servidor' })
    }

}

module.exports = atualizarTransacao