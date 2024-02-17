const pool = require('../../conexao')

const obterExtrato = async (req, res) => {
    const { id } = req.usuario
    try {
        const { rows: entradas } = await pool.query(`select * from transacoes where tipo ilike 'entrada'and usuario_id = $1`, [id])
        const { rows: saidas } = await pool.query(`select * from transacoes where tipo ilike 'saida'and usuario_id = $1`, [id])

        const totalDeEntradas = entradas.reduce((total, transacao) => total + transacao.valor, 0)

        const totalDeSaidas = saidas.reduce((total, transacao) => total + transacao.valor, 0)

        const extrato = {
            entrada: totalDeEntradas,
            saida: totalDeSaidas
        };
        return res.status(200).json(extrato)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro do servidor' })
    }
}

module.exports = obterExtrato