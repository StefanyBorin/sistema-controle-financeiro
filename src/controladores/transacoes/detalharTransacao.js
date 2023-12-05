const pool = require("../../conexao");

async function detalharTransacao(req, res) {
    const { id } = req.params;
    const { id: idUsuario } = req.usuario;

    try {
        const query =
            "select * from transacoes where id = $1 and usuario_id = $2";

        const params = [id, idUsuario];

        const { rows, rowCount } = await pool.query(query, params);

        if (rowCount === 0) {
            return res
                .status(404)
                .json({ menssagem: "Transação não encontrada." });
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(500).json({ menssagem: "Erro interno do servidor" });
    }
}

module.exports = { detalharTransacao };
