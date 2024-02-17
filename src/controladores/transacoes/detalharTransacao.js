const pool = require('../../conexao')


const detalharTransacao = async (req, res) => {
    const { id: idTransacao } = req.params
    const { id: idUsuario } = req.usuario

    try {
        const { rows } = await pool.query(` select transacoes.id,
        transacoes.tipo,
        transacoes.descricao,
        transacoes.valor,
        transacoes.data,
        transacoes.usuario_id,
        categorias.id as categoria_id,
        categorias.descricao as categorias_nome
        from categorias
        join transacoes on categorias.id = transacoes.categoria_id
       where transacoes.id = $1 and transacoes.usuario_id = $2`, [idTransacao, idUsuario])

        if (rows < 1) return res.status(404).json({ message: "Transação não encontrada" })

        return res.status(200).json(rows)

    } catch (error) {
        return res.status(401).json({ mensagem: 'Não autorizado' })
    }

}

module.exports = detalharTransacao 