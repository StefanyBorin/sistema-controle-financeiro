const pool = require("../../conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuarios = async (req, res) => {
    const { nome, email, senha } = req.body;
    console.log(senha);
    try {
        const senhaCript = await bcrypt.hash(senha, 10);

        const novoUsuario = await pool.query(
            "insert into usuarios ( nome, email, senha) values($1, $2, $3) returning nome, email, id",
            [nome, email, senhaCript]
        );

        const { senha: _, ...resposta } = novoUsuario.rows[0];

        res.status(201).json(resposta);
    } catch (error) {
        return res.status(500).json({ menssagem: "Erro interno do servidor1" });
    }
};

module.exports = { cadastrarUsuarios };
