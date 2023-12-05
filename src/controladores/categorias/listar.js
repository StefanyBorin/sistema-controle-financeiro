const pool = require("../../conexao");

async function listarCategorias(req, res) {
    const { id } = req.usuario;
    try {
        const query =
            "select distinct ct.descricao, ct.id from transacoes tr join usuarios us on tr.usuario_id = $1 join categorias ct on tr.categoria_id = ct.id";
        const params = [id];
        const { rows: categorias } = await pool.query(query, params);

        return res.status(200).json(categorias);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { listarCategorias };
