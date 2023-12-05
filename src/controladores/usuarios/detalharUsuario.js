async function detalharUsuario(req, res) {
    if (!req.usuario) {
        return res.status(400).json({
            mensagem:
                "Para acessar este recurso um token de autenticação válido deve ser enviado.",
        });
    }
    return res.status(200).json(req.usuario);
}

module.exports = { detalharUsuario };
