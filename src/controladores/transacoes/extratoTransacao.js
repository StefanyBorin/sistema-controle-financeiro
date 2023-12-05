const pool = require("../../conexao");

async function extratoTransacao(req, res) {
    const { id } = req.usuario;

    try {
        const query = "select * from transacoes where usuario_id = $1";

        const params = [id];

        const transacoes = await pool.query(query, params);

        let somaTransacoesSaidas = 0.0;

        let somaTransacoesEntradas = 0.0;

        for (let transacao of transacoes.rows) {
            if (transacao.tipo === "saida") {
                somaTransacoesSaidas += transacao.valor;
            } else if (transacao.tipo === "entrada") {
                somaTransacoesEntradas += transacao.valor;
            }
        }

        return res.status(200).json({
            entrada: somaTransacoesEntradas,
            saida: somaTransacoesSaidas,
        });
    } catch (error) {
        return res.status(500).json({ menssagem: "Erro interno do servidor" });
    }
}

module.exports = { extratoTransacao };
