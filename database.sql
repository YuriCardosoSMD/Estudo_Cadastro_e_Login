-- =========================================================
-- Banco de Dados: bdtelaloginsimples (PostgreSQL)
-- Projeto: cadastroelogin
-- =========================================================

-- PASSO 1: Criar o banco de dados
-- Execute este comando isoladamente, conectado ao banco padrão "postgres":
CREATE DATABASE bdtelaloginsimples
    WITH ENCODING = 'UTF8'
    TEMPLATE = template0;

-- PASSO 2: Conecte-se ao banco "bdtelaloginsimples" e execute o restante:

CREATE TABLE IF NOT EXISTS usuarios (
    id            SERIAL PRIMARY KEY,
    usuario       VARCHAR(100) NOT NULL,
    senha         VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_usuarios_usuario UNIQUE (usuario)
);
