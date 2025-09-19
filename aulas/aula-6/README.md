(AULA 6)

12 - express generator -> gera a estrutura padrão de uma API 

1) npx express-generator --no-view aula06.  

- vai pro diretório 
- npm install 

2) pode apagar a pasta public 

3) pode apagar o route -> users 

4) tudo que é referente a essas pastas que apagou deve apagar também no app.js. 


5) npm install --save-dev nodemon jest supertest

--> supertest permite que o jest chame a api sem precisar do nodemon. 

adiciona o script "dev": "nodemon ./bin/www"

--> chama o watchAll no test jest -watchAll

6) Criar fold test -> app.test.js 
    Criar app.js e fazer toda a estrutura lá . (Ou na real acho que ele já vem no expressGenerator.)

    Criar o CRUD lá. 

