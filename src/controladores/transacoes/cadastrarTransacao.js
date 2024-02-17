const pool = require('../../conexao')

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, categoria_id, tipo } = req.body
    const { id } = req.usuario

    if (!descricao || !valor || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' })
    }
    if (tipo != "entrada" && tipo != "saida") return res.status(400).json({ message: "O campo 'tipo' deve ser 'entrada' ou 'saida'." })
    try {
        const { rows: categoriaExistente } = await pool.query('select * from categorias where id = $1', [categoria_id])
        if (categoriaExistente.length === 0) return res.status(400).json({ mensagem: 'Categoria não encontrada.' })

        const query = 'insert into transacoes (descricao, valor, categoria_id, usuario_id, tipo) values ($1, $2, $3, $4, $5) returning *'
        const { rows } = await pool.query(query, [descricao, valor, categoria_id, id, tipo])
        const categoriaTransacao = await pool.query('SELECT * FROM categorias WHERE id = $1', [categoria_id]);

        const transacaoCadastrada = {
            id: rows[0].id,
            tipo: rows[0].tipo,
            descricao: rows[0].descricao,
            valor: rows[0].valor,
            data: rows[0].data,
            usuario_id: rows[0].usuario_id,
            categoria_id: rows[0].categoria_id,
            categoria_nome: categoriaTransacao.rows[0].descricao,
        };

        return res.status(201).json(transacaoCadastrada)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro do servidor' })
    }
}

module.exports = cadastrarTransacao