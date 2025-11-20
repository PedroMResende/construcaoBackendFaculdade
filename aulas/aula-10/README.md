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
#### ‼️ ‼️ Pode-se importar o dotenv em qualquer lugar, ele é de escopo global, mas tem que ser criado o arquivo na raíz, justamente por isso. 

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

## A pasta auth.js tem duas funções verificar o token e gerar o token. 

## 8) Depois de criar a lógica dentro da pasta auth.js devemos colocar na rota que você quer o token pra entrar um middleware de validação. 

```javascript
router.get('/', auth.verificarToken, function(req, res, next) {
  res.json("API está ON");
});
```
> ‼️
> <span style = "color:red">Ou seja, ele bate na rota chamada, chama a função que verifica o token e depois chama a lógica do ENDPOINT.</span>
> ‼️

## 9) Agora vamos ver como passa o token pra acessar com o middle

1) Ir em authorization
2) Selecionar o tipo bearer token. 
3) Passa o token no bearer token. 
4) Lançar uma lógica no código pra pegar só o token sem pegar a palabra bearer 

## 10) Deve-se criar uma lógica de renovação de TOKEN, pra quando o token ficar inválido não ter que passar por todo o processo de login.
