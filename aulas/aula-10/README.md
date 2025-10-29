# Iniciando o processod de autenticação via JWT. 

## 1) Instalando os pacotes iniciais 
```bash
npx express-generator --no-view aula10
```
```bash
npm install
```
```bash
npm install dotenv jsonwebtoken
```

```bash
npm install nodemon --save-dev
```

## 2) Em teoria apagar a pasta public e as rotas index e users e algumas linhas do app.js, estão comentadas. 

## 3) Ajustar os scripts (Clássico)
```js
"dev":"nodemon ./bin/www"
```

## 4) Criar o .env na raíz. 
```js
JWT_SEGREDO = abcd1234
```

## 5) Importar o dotenv no app.js

```js
require('dotenv').config(); 
```

## 6) Mudar o index.js no caminho da rota /. 

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json("API está ON");
});

module.exports = router;

```

## 7) Para criar a autenticação é necessária a criação de um Login. 
### Deve-se fazer um /users e um /login -> /users/login

#### Entrar no Users.js e aplicar a lógica

## 8) Criar a pasta middlewares para continuar a lógica de autenticação.
### Criar um arquivo pra trabalhar duas partes do cógido 
1) Gerar o Token 
2) Validar o Token 

### Criar as pastas 
1) auth.js

