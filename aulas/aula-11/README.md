## Documentação de API REST com Swagger

## Parte 1 

```bash
npx express-generator --no-view aula-11 
```

```bash
npm install
```

```bash
npm install swagger-ui-express yaml
```

```bash
npm install --save-dev nodemon
```

## Parte 2 

- Criar o arquivo apidocs.js dentro da pasta routes. 
- Criar o swagger.yaml 

## Parte 3 

### Passar o script 
```js
    "dev": "nodemon -e yaml,js ./bin/www"  // -> flag utilizada para o nodemon escutar e atualizar automaticamente todos os arquivos .yaml e .js. 
```

## Parte 4 
#### Mão na massa lá no swagger YAML. 

## Parte 5 
### CORS 

- instala o cors
```bash
npm install cors 
```
- vai na app (importa o cors); 
```js
const cors = require('cors'); 
```
- passa o parâmetro no middleware antes das rotas necessariamente. 
```js
app.use(cors());
```

>
> Da forma que está acima qualquer host pode acessar a API. 
>

```js
app.use(cors({
    //aqui vai a parte que você limita quem pode consumir. 
}))
```



