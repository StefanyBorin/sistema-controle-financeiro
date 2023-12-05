const pool = require("../../conexao");

async function listarTranscao(req, res) {
    const { id } = req.usuario;

    try {
        const query = "select * from transacoes where usuario_id = $1";

        const params = [id];

        const { rows: transacoes } = await pool.query(query, params);

        return res.status(200).json(transacoes);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { listarTranscao };
