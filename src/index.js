require("dotenv").config();
const cors = require("cors");
const express = require("express");
const rotas = require("./rotas");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(rotas);

app.listen(PORT);
