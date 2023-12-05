const jwt = require("jsonwebtoken");
const pool = require("../../conexao");
const bcrypt = require("bcrypt");

async function login(req, res) {
    const { email, senha } = req.body;

    try {
        const query = "select * from usuarios where email = $1";

        const params = [email];

        const { rowCount, rows } = await pool.query(query, params);

        if (rowCount <= 0) {
            return res.status(400).json("Email e/ou senha inválido(s)");
        }

        const [usuario] = rows;

        //const { senha: senhaUsuario, ...usuario } = rows[0];

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(400).json({
                Mensagen: "Email ou senha inválidos",
            });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "8h",
        });

        const { senha: _, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { login };
