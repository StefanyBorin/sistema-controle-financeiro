const pool = require("../../conexao");

const cadastrarNovaTransacao = async (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body;
    const { usuario } = req;

    try {
        if (!tipo || !descricao || !valor || !data || !categoria_id) {
            return res.status(400).json({
                menssagem: "Todos os campos obrigatórios devem ser informados.",
            });
        }

        if (tipo !== "entrada" && tipo !== "saida") {
            return res
                .status(400)
                .json({ menssagem: "O tipo informado é inválido" });
        }

        const categoriaExiste = await pool.query(
            "select * from categorias where id = $1",
            [categoria_id]
        );

        if (categoriaExiste.rowCount <= 0) {
            return res.status(400).json({ menssagem: "Categoria inválida" });
        }

        const { rowCount, rows } = await pool.query(
            "insert into transacoes ( tipo, descricao, valor, data, categoria_id, usuario_id) values($1, $2, $3, $4, $5, $6) returning * ",
            [tipo, descricao, valor, data, categoria_id, usuario.id]
        );

        if (rowCount <= 0) {
            return res
                .status(400)
                .json({ menssagem: "Categoria não encontrada" });
        }

        const [transacao] = rows;

        transacao.categoria_nome = categoriaExiste.rows[0].descricao;

        res.status(201).json(transacao);
    } catch (error) {
        return res.status(500).json({ menssagem: "Erro interno do servidor" });
    }
};

module.exports = { cadastrarNovaTransacao };
