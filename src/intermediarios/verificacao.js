const jwt = require("jsonwebtoken");
const pool = require("../conexao");

async function verificaUsuario(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: "Não autorizado" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
        
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const query = "select * from usuarios where id = $1";

        const params = [id];

        const { rows, rowsCount } = await pool.query(query, params);

        if (rowsCount === 0) {
            return res.status(400).json({ mensagem: "Não autorizado" });
        }

        const { senha: senha, ...usuario } = rows[0];
        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(401).json({ menssagem: "Não autorizado" });
    }
}

const validarEmail = async (req, res, next) => {
    const { nome, email, senha } = req.body;

    try {
        if (!nome || !senha || !email) {
            return res
                .status(400)
                .json({ menssagem: "Todos os campos são obrigatórios" });
        }
        
        const validar = await pool.query(
            "select * from usuarios where email = $1",
            [email]
        );
            
        if (validar.rowCount > 0) {
            return res.status(400).json({
                mensagem:
                    "Já existe usuário cadastrado com o e-mail informado.",
            });
        }
        
        next();
    } catch (error) {
        
        return res.status(500).json({ mensagem: "Erro interno do servidor1" });
    }
};

module.exports = {
    validarEmail,
    verificaUsuario,
};
