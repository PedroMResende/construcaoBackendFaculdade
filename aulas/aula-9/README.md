## 1) Subindo o express-generator 

```bash
npx express-generator --no-view aula-9
```
## 2) Subindo o arquivo .enviroment 
#### Para a segurança das informações 

```bash 
npm install dotenv 
```
#### Carrega o arquivo com as configurações das variáveis. 


## 3) Instalar o Mongoose 
    Feito para implementar modelos, não precisando criar as classes do zero. 
    Sem o mongoose a comunicação é direta via node - Mongo. 
    Com o mongoose a comunicação é com o mongoose o mongoose comunica com o mongoose driver e o mongoose driver com o MongoDB

```bash
npm install mongoose
``` 

## 4) Instalar o Nodemon, Jest e Supertest para testes. 

```bash
npm install --save-dev nodemon jest supertest 
```
>---
> **Relembrando**: 
> * **Nodemon** : Fica assistindo o código e reinicia o servidor automaticamente toda vez que tem um save. Sem ele você teria que parar e rodar node app.js toda vez que mudasse algo. 
>---
> * **Jest** : Ferramenta de testes para JS, ele que entende os scripts test('GET / retorna...' () => {...})
>---
> * **Supertest**: Usado para testar requisições HTTP (suas rotas de API) 
>   > * ✅ Simula chamadas GET, POST, PUT, DELETE sem precisar subir o servidor de verdade. 
>   > * 👍🏼 Ele permite simular requisições HTTP reais (como GET, POST, PUT, DELETE), mas sem precisar rodar o servidor de verdade.
>   > * 👉🏼 Ele “conversa direto” com o seu objeto app do Express.
>   > * Normalmente, pra testar uma API, você teria que:
>   >   1. Subir o servidor (npm run dev),
>   >   2.	Abrir o Postman ou Insomnia,
>   >   3.	Fazer as requisições manualmente.
>   >- O Supertest **automatiza tudo isso**.
>   >   - Ele cria as requisições internamente no código, e você define o que espera como resposta (status, corpo, cabeçalhos, etc.).
>---


## 5) Criar o arquivo .env na raíz do projeto. 

#### Subir lá os dados de usuário. 

```js
MONGODB_USER = *******
MONGODB_PASSWD = ********
MONGODB_HOST = ********
```

## 6) Importar no app.js o dotenv. 

```js
require('dotenv').config()
```

## 7) Fazer a limpa no app.js 
    Comentado no arquivo. 

## 8) Subindo a URL utilizada no MongoDB, utilizando as variáveis no .env 
```js
const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWD}@${process.env.MONGODB_HOST}/` ; 
```
```
process.env.____________ // o process .env chama as variáreis que estão no .env salvo na raíz. 
```

## 9) Importar o pacote do Mongoose 

```js
const mongoose = require("mongoose"); //importa o mongoose.  
mongoose
.connect(url)
.then(() => { 
    console.log("Conectado no MongoDB")
})
.catch((err) => { 
    console.log("Erro ao conectar no MongoDB", err.message)
}) //recebe uma promise e ela é tratada. 
```

## 10) Passar os scripts pro package.json 

```json 
"start" : "node ./bin/www", 
"dev" : "nodemon ./bin/www", 
"test" : "jest --watchAll"
```

## 11) Construir o roteador pra criar o CRUD 

```js
const tarefaRouter = require('./routes/tarefaRouter');  
```

#### Chamar o Middleware no final do app.js 
```js 
app.use("/tarefas", tarefaRouter); 
```

#### Chamamos antes de construir! (metodologia TDD)

## 12) Na pasta routes, apagar o que contém e criar o tarefaRouter.js

#### Importa o express, importa o Router do expres e depois puxa o CRUD. 

```js
const express = require("express") ; 

const router = express.Router(); 

router.get('/'); 

router.post('/'); 

router.get('/:id'); 

router.put('/:id'); 

router.delete('/:id'); 

module.exports = router; 
```

## 13) Chamar as funções do controlador em cada rota. 

```js
const controller = require('../controller/tarefaController'); 


router.get('/', controller.listar); 

router.post('/', controller.criar); 

router.get('/:id', controller.buscar, controller.exibir); 

router.put('/:id', controller.buscar, controller.atualizar); 

router.delete('/:id', controller.buscar, controller.remover);  
```

#### Chamamos antes de criar porque estamos seguindo a metodologia TDD. (TestDrivenDevelopment)
#### Devemos criar o controlador 

## 14) Criar o controlador e as funções respectivas do CRUD. 

```js
function listar(req,res){ 
    return res.json({}); 
}; 

function criar(req,res){ 
    return res.status(201).json({}); 
}; 

function buscar(req,res, next){
    const {id} = req.params; 
    next(); 
}; 

function exibir(req,res){ 
    return res.json({}); 
}

function atualizar(req,res){
    return res.json({}); 
}

function remover(req,res){
    return res.status(204).end();
}

module.exports = {listar,buscar,criar,exibir,atualizar,remover}
```
#### Foram criadas sem as lógicas por enquanto. 

## 15) Criar a pasta tests e dentro da pasta tests criar o tarefaRouter.test.js

```js
const supertest = require('supertest'); 
const app = require('../app'); 
const request = supertest(app); 

let id = null; 

const url = '/tarefas'; 


describe('Testes do recurso /tarefas', () => { 
    test('POST / deve retornar 201', async() => { 
        const response = await request.post(url).send({nome: "Estudar"});
        expect(response.status).toBe(201); 
        id = response.body.id ; 
    }); 

    test('GET / deve retornar 200', async() => { 
        const response = await request.get(url); 
        expect(response.status).toBe(200); 
    }); 

    test('GET /id deve retornar 200', async() => { 
        const response = await request.get(`${url}/${id}`); 
        expect(response.status).toBe(200); 
    }); 

    test('PUT /id deve retornar 200', async() => { 
        const response = await request 
        .put(`${url}/${id}`)
        .send({nome: 'Estudar Express', concluida: true}); 
        expect(response.status).toBe(200); 
    }); 

    test('DELETE /id deve retornar 204', async() => { 
        const response = await request.delete(`${url}/${id}`); 
        expect(response.status).toBe(204)
    })
})
```
#### **A ordem dos testes é importante!!** 

## 16) Criar a pasta models e o arquivo tarefaModel.js

#### Importar o mongoose 
```bash
const mongoose = require('mongoose') ; 
```

#### Criar um mongoose Schema -> Uma classe JS que está mapeada com o documento que vai ser criado no mongoDB. 
```js
const schema = new mongoose.Schema({
    nome: string,
    concluida: Boolean,
}) ////esse schema é pra criar um modelo do que vai subir pro mongoose, porque senão ele sobe qualquer coisa. Tipo uma interface JAVA. 

//exportar o modelo. 
mmodule.exports = mongoose.Model('Tarefa', schema); 
```
### **‼️‼️IMPORTANTE:** É um padrão colocar o nome do Model no singular, o mongoose automaticamente pega a collection do plural de Tarefa, ou seja, tarefas. (passa pra LowerCase())  

## 17) Ir no Controller e importar o Model, pra trabalhar com esse Schema e implementar todas as funções do CRUD a partir do SCHEMA. 

```js
const Tarefa = require('../models/tarefaModel'); 

async function listar(req,res){              
const tarefas = await Tarefa.find({})          // -> Adicionar essa linha e passar async. Esse Tarefa é o que foi importado. 
return res.json(tarefas); 
}; 
```
#### Adicionar uma linha no teste. 
```js
expect(Array.isArray(response.body)).toBe(true); //testa se a resposta vem como um array. 
```

### **LEMBRANDO QUE EM NENHUM MOMENTO FOI ESPECIFICADO O BANCO DE DADOS QUE DEVE SER UTILIZADO.**

#### Vai no .env e cria a variável que se refere ao banco de dados. 

```js
MONGODB_DBNAME = agenda
```

#### Chama ela na url de conexão. No final da URL. Precisa passar o nome do banco de dados. 
```js
const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`; 
```
## 18) Volta no controlador e faz o tratamento da exceção no método listar, por enquanto. 
```js
async function listar(req,res){
    try {
        const tarefas = await Tarefa.find({})
        return res.json(tarefas); 
    } catch(err) {
        res.status(500).json({msg: "Deu ruim :/" + err.message})
    }
}; 
```




