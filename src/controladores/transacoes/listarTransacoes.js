const pool = require('../../conexao')

const listarTransacoes = async (req, res) => {
    const { id } = req.usuario

    try {

        const { rows } = await pool.query(`select
        transacoes.id,
        transacoes.tipo,
        transacoes.descricao,
        transacoes.valor,
        transacoes.data,
        transacoes.usuario_id,
        categorias.id as categoria_id,
        categorias.descricao as categoria_nome
      from
        categorias
      join
        transacoes on categorias.id = transacoes.categoria_id
      where
        transacoes.usuario_id = $1;`, [id])


        return res.status(200).json(rows)

    } catch (error) {
        return res.status(401).json({ mensagem: 'Não autorizado' })
    }
}

module.exports = listarTransacoes 