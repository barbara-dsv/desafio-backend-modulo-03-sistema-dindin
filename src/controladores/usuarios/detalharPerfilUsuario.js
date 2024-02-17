const detalharPerfilUsuario = async (req, res) => {
    try {
        return res.status(200).json(req.usuario);
    } catch (error) {
        return res.status(401).json({ mensagem: 'Não autorizado' })
    }

}

module.exports = detalharPerfilUsuario