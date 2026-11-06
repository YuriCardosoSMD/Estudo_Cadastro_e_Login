# 🔐 Cadastro e Login — Node.js + Express + PostgreSQL

Aplicação web de **cadastro e autenticação de usuários**, desenvolvida para estudo e prática de integração entre **Front-End** e **Back-End**.

O projeto permite que o usuário crie uma conta, receba a confirmação de cadastro e acesse o sistema por meio de uma tela de login, com os dados persistidos em um banco **PostgreSQL**.

---

## ✨ Funcionalidades

- **Cadastro de usuários** com confirmação de senha (validação no navegador e no servidor)
- **Verificação de usuário duplicado** antes de salvar no banco
- **Login** com validação de credenciais no banco de dados
- **Mensagens de erro** exibidas na tela de login (campos vazios, credenciais inválidas, erro interno)
- **Página de sucesso** após o cadastro, com redirecionamento para o login
- **Consultas parametrizadas** (`$1`, `$2`), protegendo contra SQL Injection
- **Credenciais do banco em variáveis de ambiente** (`.env`), fora do código-fonte

---

## 🛠️ Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Front-End | HTML5, CSS3, JavaScript (Vanilla), Google Fonts (Roboto) |
| Back-End | Node.js, Express |
| Banco de Dados | PostgreSQL |
| Bibliotecas | `pg` (driver PostgreSQL), `body-parser`, `dotenv` |

---

## 📁 Estrutura do projeto

```
cadastroelogin/
├── public/
│   ├── login.html             # Tela de login
│   ├── cadastro.html          # Tela de cadastro
│   └── sucessocadastro.html   # Confirmação de cadastro
├── database.sql               # Script de criação do banco e da tabela
├── index.js                   # Servidor Express e rotas
├── .env.example               # Modelo de variáveis de ambiente
├── .gitignore
├── package.json
└── README.md
```

---

## 📋 Requisitos

- [Node.js](https://nodejs.org/) **18 ou superior** (exigido pelo Express 5)
- [PostgreSQL](https://www.postgresql.org/download/) instalado e em execução
- [pgAdmin 4](https://www.pgadmin.org/) (opcional, para gerenciar o banco visualmente)
- Git

---

## 🗄️ Banco de dados

O script completo está no arquivo [`database.sql`](database.sql).

**1. Criar o banco** (execute isoladamente, conectado ao banco padrão `postgres`):

```sql
CREATE DATABASE bdtelaloginsimples
    WITH ENCODING = 'UTF8'
    TEMPLATE = template0;
```

**2. Criar a tabela** (conectado ao banco `bdtelaloginsimples`):

```sql
CREATE TABLE IF NOT EXISTS usuarios (
    id            SERIAL PRIMARY KEY,
    usuario       VARCHAR(100) NOT NULL,
    senha         VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_usuarios_usuario UNIQUE (usuario)
);
```

> 💡 No pgAdmin: clique com o botão direito em **Databases → Create → Database...** para criar o banco, depois abra o **Query Tool** dentro dele e execute o `CREATE TABLE`.

---

## 🚀 Como rodar o projeto

**1. Clone o repositório**

```bash
git clone https://github.com/SEU-USUARIO/cadastroelogin.git
cd cadastroelogin
```

**2. Instale as dependências**

```bash
npm install
```

**3. Configure as variáveis de ambiente**

Copie o arquivo `.env.example` para `.env`:

```bash
# Linux / macOS
cp .env.example .env

# Windows (PowerShell)
copy .env.example .env
```

E preencha com os dados do seu PostgreSQL:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_NAME=bdtelaloginsimples
```

**4. Crie o banco de dados** conforme a seção [Banco de dados](#️-banco-de-dados).

**5. Inicie o servidor**

```bash
npm start
```

Ou, em modo de desenvolvimento (reinicia automaticamente ao salvar):

```bash
npm run dev
```

**6. Acesse no navegador**

```
http://localhost:3000
```

---

## 🔀 Rotas da aplicação

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Exibe a tela de login |
| GET | `/login` | Exibe a tela de login |
| GET | `/cadastro` | Exibe a tela de cadastro |
| GET | `/sucessocadastro` | Exibe a confirmação de cadastro |
| POST | `/login` | Valida as credenciais do usuário |
| POST | `/cadastro` | Cadastra um novo usuário |

---

## 🔮 Melhorias futuras

- Criptografia de senhas com **bcrypt**
- Controle de sessão (**express-session** ou **JWT**)
- Página inicial protegida após o login
- Funcionalidade de recuperação de senha

---

## 👤 Autor

**Yuri Da Silva Cardoso**

Projeto desenvolvido para fins de estudo em desenvolvimento Front-End e Back-End.
