const express = require("express");

const {
    listarTranscao,
} = require("./controladores/transacoes/listarTransacao");

const { login } = require("./controladores/usuarios/login");

const { detalharUsuario } = require("./controladores/usuarios/detalharUsuario");

const { cadastrarUsuarios } = require("./controladores/usuarios/cadastrar");

const { listarCategorias } = require("./controladores/categorias/listar");

const {
    validarEmail,
    verificaUsuario,
} = require("./intermediarios/verificacao");

const { atualizarCadastro } = require("./controladores/usuarios/atualizar");

const {
    cadastrarNovaTransacao,
} = require("./controladores/transacoes/cadastrarTransacao");

const {
    extratoTransacao,
} = require("./controladores/transacoes/extratoTransacao");

const {
    detalharTransacao,
} = require("./controladores/transacoes/detalharTransacao");

const {
    atualizarTransacao,
} = require("./controladores/transacoes/atualizarTransacao");

const {
    excluirTransacao,
} = require("./controladores/transacoes/excluirTransacao");

const rotas = express();

rotas.post("/usuario", validarEmail, cadastrarUsuarios);

rotas.post("/login", login);

rotas.use(verificaUsuario);

rotas.put("/usuario", validarEmail, atualizarCadastro);

rotas.get("/usuario", detalharUsuario);


rotas.get("/categoria", listarCategorias);


rotas.get("/transacao", listarTranscao);

rotas.put("/transacao/:id", atualizarTransacao);

rotas.post("/transacao", cadastrarNovaTransacao);

rotas.get("/transacao/extrato", extratoTransacao);

rotas.get("/transacao/:id", detalharTransacao);

rotas.delete("/transacao/:id", excluirTransacao);

module.exports = rotas;
