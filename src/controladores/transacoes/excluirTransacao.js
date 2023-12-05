const pool = require("../../conexao");

const excluirTransacao = async (req, res) => {
    const { id } = req.params;
    const { usuario } = req;
    try {
        const existeTransacao = await pool.query(
            "select tr.id from transacoes tr join usuarios us on us.id = tr.usuario_id where tr.id = $1 and us.id = $2",
            [id, usuario.id]
        );

        const { rowCount } = existeTransacao;

        if (rowCount <= 0) {
            return res
                .status(400)
                .json({ menssagem: "Transação não encontrada" });
        }

        await pool.query("delete from transacoes where id = $1", [id]);

        return res.status(200).json();
    } catch (error) {
        return res.status(500).json({ menssagem: "Erro interno do servidor" });
    }
};

module.exports = {
    excluirTransacao,
};
