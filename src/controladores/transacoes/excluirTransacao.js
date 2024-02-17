const pool = require('../../conexao')

const excluirTransacao = async (req, res) => {
    const { id: idTransacao } = req.params
    const { id } = req.usuario
    try {
        const { rows: transacaoEncontrada } = await pool.query('select * from transacoes where id = $1 and usuario_id = $2', [idTransacao, id])
        if (transacaoEncontrada.length === 0) return res.status(400).json({ mensagem: 'Transação não encontrada.' })

        const excluindoTransicao = await pool.query('delete from transacoes where id = $1 and usuario_id = $2', [idTransacao, id])

        return res.status(201).send()

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro do servidor' })
    }
}
module.exports = excluirTransacao