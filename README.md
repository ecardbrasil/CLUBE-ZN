# CLUBE ZN - Instruções de Execução

Este projeto utiliza o Supabase como backend. Para executá-lo corretamente, você precisará configurar suas próprias credenciais do Supabase tanto para o frontend quanto para o backend.

## ❗️ Ação Necessária: Configurar Credenciais Supabase

A aplicação não funcionará sem as suas credenciais. Por favor, siga estes passos primeiro.

1.  **Acesse seu projeto Supabase:** Vá para [app.supabase.com](https://app.supabase.com), selecione seu projeto e navegue até **Project Settings > API**.
2.  **Copie suas credenciais:** Você precisará de dois valores:
    *   **Project URL**
    *   **Project API Keys > `anon` `public` key**

### a. Configurar Frontend

Abra o arquivo `lib/supabaseClient.ts` e substitua os placeholders com suas credenciais:

```typescript
// Em: lib/supabaseClient.ts

// ...

// TODO: Substitua pelos dados do seu projeto Supabase.
const supabaseUrl = 'https://<SEU-ID-DE-PROJETO>.supabase.co'; // Cole sua Project URL aqui
const supabaseKey = '<SUA-CHAVE-ANON>'; // Cole sua anon public key aqui

// ...
```

### b. Configurar Backend

Crie um arquivo chamado `.env` dentro da pasta `server/`. Copie o conteúdo abaixo e substitua os placeholders com as mesmas credenciais:

```ini
# Em: server/.env

# Credenciais do seu projeto Supabase
SUPABASE_URL=https://<SEU-ID-DE-PROJETO>.supabase.co
SUPABASE_ANON_KEY=<SUA-CHAVE-ANON>
```

---

## Executando a Aplicação

Depois de configurar as credenciais, siga os passos abaixo.

### 1. Iniciar o Backend

O backend é responsável por gerar e validar os cupons.

#### a. Instalar Dependências

Navegue até o diretório `server/` e instale as dependências:

```bash
cd server
npm install
```

#### b. Iniciar o Servidor

Ainda no diretório `server/`, inicie o servidor:

```bash
npm start
```

O servidor será executado em `http://localhost:4000`.

### 2. Executar o Frontend

O frontend é a aplicação React que os usuários e parceiros interagem.

**Importante:** Neste ambiente de desenvolvimento, o frontend é executado automaticamente. Após configurar o `lib/supabaseClient.ts` (passo **a.** da configuração), a aplicação já estará pronta para uso na URL fornecida.

## Como Usar a Aplicação

1.  **Backend:** Mantenha o terminal com o servidor backend (`npm start`) em execução.
2.  **Frontend:** Acesse a URL da aplicação fornecida por este ambiente.

### Testando o Fluxo

1.  **Cadastro:** Crie uma conta de **cliente** e uma conta de **parceiro**.
2.  **Parceiro:** Faça login como parceiro, vá para "Minhas Ofertas" e crie pelo menos uma oferta.
3.  **Cliente:** Faça login como cliente. No painel, você verá a oferta criada.
4.  **Gerar Cupom:** Clique em "Gerar Desconto". Um modal aparecerá com um código de 6 dígitos e um contador de 10 minutos.
5.  **Validar Cupom:** Copie o código. Faça logout do cliente e login como parceiro. Vá para a seção "Validar Cupom", insira o código e clique em "Validar".
6.  **Teste Offline:** Desative sua conexão com a internet. No painel do parceiro, tente validar um código. Ele será salvo para sincronização. Reative a internet e a sincronização ocorrerá automaticamente.