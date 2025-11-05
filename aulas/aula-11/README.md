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

