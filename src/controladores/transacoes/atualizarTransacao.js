const pool = require("../../conexao");

async function atualizarTransacao(req, res) {
    const { id: usuarioId } = req.usuario;
    const { id: transacaoId } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        if (!descricao || !valor || !data || !categoria_id || !tipo) {
            return res.status(400).json({
                menssagem: "Todos os campos obrigatórios devem ser informados.",
            });
        }
        const queryIdTransacao =
            "select * from transacoes where id = $1 and usuario_id = $2";

        const paramsIdtransacao = [transacaoId, usuarioId];

        const { rowCount } = await pool.query(
            queryIdTransacao,
            paramsIdtransacao
        );

        if (rowCount === 0) {
            return res
                .status(404)
                .json({ menssagem: "Transação não encontrada" });
        }

        const queryAtualizarTransacao =
            "update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6;";

        const paramsAtualizarTransacao = [
            descricao,
            valor,
            data,
            categoria_id,
            tipo,
            transacaoId,
        ];

        await pool.query(queryAtualizarTransacao, paramsAtualizarTransacao);

        return res.status(200).json();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { atualizarTransacao };
