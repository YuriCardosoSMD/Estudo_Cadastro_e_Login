require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware para ler formulários (POST)
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (HTML, CSS, JS da pasta "public")
app.use(express.static(path.join(__dirname, "public")));

// Conexão com o banco de dados PostgreSQL (dados lidos do arquivo .env)
const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "bdtelaloginsimples"
});

// Testar conexão
pool.query("SELECT 1")
    .then(() => console.log("✅ Conectado ao banco de dados PostgreSQL!"))
    .catch((err) => console.error("❌ Erro ao conectar ao banco de dados:", err.message));

// ---------------- ROTAS ----------------

// Página inicial → login
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Página de login
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Página de cadastro
app.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "cadastro.html"));
});

// Página de sucesso após o cadastro
app.get("/sucessocadastro", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "sucessocadastro.html"));
});

// ---------------- ROTA DE LOGIN ----------------
app.post("/login", async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.redirect("/login?erro=Preencha todos os campos!");
    }

    try {
        const query = "SELECT id FROM usuarios WHERE usuario = $1 AND senha = $2";
        const result = await pool.query(query, [usuario, senha]);

        if (result.rows.length > 0) {
            res.send(`
                <h2>✅ Login bem-sucedido!</h2>
                <p>Bem-vindo, <strong>${usuario}</strong>!</p>
            `);
        } else {
            res.redirect("/login?erro=Usuário ou senha incorretos!");
        }
    } catch (err) {
        console.error("Erro ao consultar banco:", err);
        res.redirect("/login?erro=Erro interno no servidor.");
    }
});

// ---------------- ROTA DE CADASTRO ----------------
app.post("/cadastro", async (req, res) => {
    const { usuario, senha, confirmarSenha } = req.body;

    if (!usuario || !senha || !confirmarSenha) {
        return res.send("❌ Preencha todos os campos!");
    }

    if (senha !== confirmarSenha) {
        return res.send(`
            <script>
                alert("⚠️ As senhas não coincidem!");
                window.location.href = "/cadastro";
            </script>
        `);
    }

    try {
        // Verifica se o usuário já existe
        const checkUser = "SELECT id FROM usuarios WHERE usuario = $1";
        const checkResult = await pool.query(checkUser, [usuario]);

        if (checkResult.rows.length > 0) {
            return res.send(`
                <script>
                    alert("⚠️ Usuário já cadastrado!");
                    window.location.href = "/cadastro";
                </script>
            `);
        }

        // Cria o novo usuário
        const insertUser = "INSERT INTO usuarios (usuario, senha) VALUES ($1, $2)";
        await pool.query(insertUser, [usuario, senha]);

        res.redirect("/sucessocadastro");
    } catch (err) {
        console.error("Erro ao cadastrar usuário:", err);
        res.status(500).send("Erro ao salvar no banco de dados.");
    }
});

// ---------------- INICIAR SERVIDOR ----------------
app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
