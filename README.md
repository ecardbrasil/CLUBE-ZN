# CLUBE ZN - Instruções de Execução

Este projeto agora inclui um frontend em React e um backend em Node.js/Express para o sistema de cupons. Siga os passos abaixo para executar a aplicação completa localmente.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (geralmente instalado com o Node.js)

## 1. Configuração do Backend

O backend é responsável por gerar e validar os cupons.

### a. Instalar Dependências

Navegue até o diretório `server/` e instale as dependências:

```bash
cd server
npm install
```

### b. Configurar Variáveis de Ambiente

No diretório `server/`, renomeie o arquivo `.env.example` para `.env` e preencha com as suas credenciais do Supabase. O backend precisa delas para buscar informações do usuário e da oferta ao validar um cupom.

```ini
# server/.env

# Credenciais do seu projeto Supabase
SUPABASE_URL=https://wcjqkjloofrjdyzamkxn.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjanFramxvb2ZyamR5emFta3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MjI4NDksImV4cCI6MjA3MTE5ODg0OX0.poHKJOj1VlomnoyJ1GWCweoIhuXk3ZH6Di-awC-DDX0
```

### c. Iniciar o Servidor Backend

Ainda no diretório `server/`, inicie o servidor:

```bash
npm start
```

O servidor será executado em `http://localhost:4000`. Na primeira vez que ele iniciar, um arquivo de banco de dados `clubzn.db` será criado automaticamente no mesmo diretório.

## 2. Execução do Frontend

O frontend é a aplicação React que os usuários e parceiros interagem.

**Importante:** O frontend já está configurado neste ambiente de desenvolvimento. Você não precisa instalar dependências ou iniciá-lo manualmente. As alterações feitas nos arquivos React serão refletidas automaticamente.

## Como Usar a Aplicação

1.  **Frontend:** Acesse a URL fornecida pelo ambiente de desenvolvimento.
2.  **Backend:** Manter o terminal com o comando `npm start` (executado no passo 1c) aberto.

### Testando o Fluxo

1.  **Cadastro:** Crie uma conta de **cliente** e uma conta de **parceiro**.
2.  **Parceiro:** Faça login como parceiro, vá para "Minhas Ofertas" e crie pelo menos uma oferta.
3.  **Cliente:** Faça login como cliente. No painel, você verá a oferta criada.
4.  **Gerar Cupom:** Clique em "Gerar Desconto". Um modal aparecerá com um código de 6 dígitos e um contador de 10 minutos.
5.  **Validar Cupom:** Copie o código. Faça logout do cliente e login como parceiro. Vá para a nova seção "Validar Cupom", insira o código e clique em "Validar".
6.  **Teste Offline:** Desative sua conexão com a internet. No painel do parceiro, tente validar um código. Ele será salvo para sincronização. Reative a internet e a sincronização ocorrerá automaticamente.
