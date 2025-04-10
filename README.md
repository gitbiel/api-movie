# 🎬 Movie API

Uma API RESTful para gerenciamento de filmes, com autenticação JWT, integração com a OMDb API e documentação automática.

## 🚀 Tecnologias utilizadas

- Node.js
- Express
- MongoDB (via Docker)
- Mongoose
- JWT
- Zod
- OMDb API
- Vitest (testes)
- API Doc

## 🧪 Como rodar o projeto localmente

### ✅ Pré-requisitos

- [Node.js]
  Recomenda-se utilizar a versão `v20.16.0`. Você pode instalá-la com [nvm](https://github.com/nvm-sh/nvm):

  ```
  nvm install 20.16.0
  nvm use 20.16.0


- [Docker](https://www.docker.com/)
  Versão recomendada: 24.0.7

- [Docker Compose](https://docs.docker.com/compose/)

### 1. Clone o repositório

```
git clone https://github.com/seu-usuario/movie-api.git
cd movie-api
```

### 2. Suba o MongoDB com Docker

```
docker-compose up -d
```

Isso irá criar um container com MongoDB rodando na porta padrão `27017`.

### 3. Instale as dependências

```
npm install
```

### 4. Configure o `.env`

Crie um arquivo .env na raiz do projeto com base no arquivo .env.example.

### 5. Rode o projeto

```
npm run dev
```

A aplicação estará disponível em: [http://localhost:3333]

---

### 6. 🧾 Documentação da API

A documentação da API pode ser gerada com o seguinte comando:

```
npm run docs
```

O conteúdo será criado na pasta `/apidoc`, na raiz do projeto. Para visualizar, você pode abrir o arquivo `index.html` diretamente no navegador ou rodar:

```
npm run docs:serve
```

Esse comando sobe um servidor local para servir a documentação, geralmente acessível em `http://localhost:3000`.


---

### 7. 🧪 Testes

Execute os testes com:

```
npm run test
```

---

### 8. 🔐 Autenticação e Headers obrigatórios

Para realizar **requisições POST e PUT**, é necessário configurar os seguintes **headers**:

#### Headers obrigatórios:

| header         | value                         | Descrição                                     |
|----------------|-------------------------------|-----------------------------------------------|
| Content-Type   | `application/json`            | Indica que o corpo da requisição está em JSON |
| Authorization  | `Bearer <seu_token_aqui>`     | Token JWT de autenticação                     |

---

## 📌 Observações

- Todos os endpoints em /api/movies exigem autenticação JWT. Para obter um token, consulte a documentação da API.
- A OMDb API é utilizada para enriquecer os dados dos filmes com informações públicas.

---

Feito por Gabriel Mendes 💻
