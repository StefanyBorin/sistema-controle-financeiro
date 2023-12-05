const pool = require("../../conexao");
const bcrypt = require("bcrypt");

const atualizarCadastro = async (req, res) => {
    const { nome, email, senha } = req.body;

    const { id } = req.usuario;

    const senhaCripto = await bcrypt.hash(senha, 10);

    await pool.query(
        "update usuarios set nome = $1, email= $2, senha= $3 where id = $4;",
        [nome, email, senhaCripto, id]
    );

    return res.status(204).json();
};

module.exports = {
    atualizarCadastro,
};
