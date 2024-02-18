const knex = require('../../bancoDeDados/conexao')

const listarTransacoes = async (req, res) => {
  const { categoria_id } = req.query
  const { id } = req.usuario

  try {
    if (categoria_id) {
      const transacaoPorCategoria = await knex('transacoes').where({ usuario_id: id, categoria_id })
      return res.status(200).json(transacaoPorCategoria)
    }

    let transacao = await knex('transacoes').where({ usuario_id: id })

    return res.status(200).json(transacao)

  } catch (error) {
    console.log(error)
    return res.status(401).json({ mensagem: 'Error interno do servidor' })
  }
}

module.exports = listarTransacoes 