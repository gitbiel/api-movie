# 🎬 Movie API

Uma API RESTful para gerenciamento de filmes, com autenticação JWT, integração com a OMDb API e documentação automática.

##  Tecnologias utilizadas

- Node.js
- Express
- MongoDB (via Docker)
- Mongoose
- JWT
- Zod
- OMDb API
- Vitest (testes)
- API Doc

###  Como rodar o projeto localmente

##  Pré-requisitos

- [Node.js]
  Recomenda-se utilizar a versão `v20.16.0`. Você pode instalá-la com [nvm](https://github.com/nvm-sh/nvm):

  ```
  nvm install 20.16.0
  nvm use 20.16.0
  ```

- [Docker](https://www.docker.com/)
  Versão recomendada: 24.0.7

- [Docker Compose](https://docs.docker.com/compose/)

### 1. Clone o repositório

```
git clone https://github.com/gitbiel/movie-api
cd movie-api
```

### 2. Instale as dependências

```
npm install
```

### 3. Configure o `.env`

Crie um arquivo .env na raiz do projeto com base no arquivo .env.example.

### 4. Suba o MongoDB com Docker

```
docker-compose up -d
```

Isso irá criar um container com MongoDB rodando na porta padrão `27017`.

### 5. Criar usuário admin

Após configurar o `.env` e garantir que o MongoDB está rodando, execute o script abaixo para criar o usuário administrador:
```
node src/scripts/create-admin-user.js
```

### 6. Rode o projeto

```
npm start
```

A aplicação estará disponível em: [http://localhost:3333](http://localhost:3333)

---

### 7. Documentação da API

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

### 8. Testes

Execute os testes com:

```
npm run test
```

---

### 9. Autenticação e Headers obrigatórios

#### Autenticação (JWT)

Todos os endpoints em `/api/movies` exigem autenticação via **JWT**.

Para obter um token de acesso, consulte o endpoint de login/documentação da API.

> **Importante:** exceto o endpoint de login, **todas as rotas do CRUD** exigem o seguinte header:

| Header        | Value                      | Descrição                     |
|---------------|----------------------------|-------------------------------|
| Authorization | `Bearer <seu_token_aqui>`  | Token JWT de autenticação     |

---

#### Content-Type para POST e PUT

As requisições **POST** e **PUT** devem incluir o seguinte header:

| Header        | Value                | Descrição                                     |
|---------------|----------------------|-----------------------------------------------|
| Content-Type  | `application/json`   | Indica que o corpo da requisição está em JSON |

---

### 📌 Observações

- A **OMDb API** é utilizada para enriquecer os dados dos filmes com informações públicas.
- Certifique-se de incluir os headers corretos para evitar erros de autenticação ou de conteúdo.


Feito por Gabriel Mendes 💻
