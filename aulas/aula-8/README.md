-> Nesta aula iremos entender como é feita a interação com o banco de dados mongoDB. 

1) Roda o npm init -y 

2) npm install mongodb => instala a biblioteca mongodb

3) Acessar o mongoDB ATLAS. 

4) Criei um usuário no database access => read and write, não é bom colocar as permissões de DBA, não é seguro. 

5) Em Network Access você libera os IPS que poderam acessar o banco, a gente pra aula coloca pra qualquer um. 

6) Adicionar um arquivo que vai conversar com o banco de dados. 
    database.js

7) Importar o mongoclient dentro do pacote mongodb. 
    const { MongoClient } = require('mongodb'); => aqui pega-se o objeto MongoClient do mongodb, sintaxe de modulos. Como não é default vem entre chaves. 

8) Gerar uma string de conexão. 
    const url = ''; 

9) Ir no mongoAtlas e pedir pra gerar a string de conexão 
    - Connect. 
    - Connect for VScode. 
    - Copiar a url pra dentro do VScode. 

10) Cria o objeto de conexão client. 

11) Cria-se uma função pra conectar. 
    função assíncrona com try/catch 

12) Cria-se um aquivo index.js 

13) Coloca nos scripts o 'test':  'node index.js'

14) Instalar um pacote pra fazer linha de comando via NodeJs
    npm install readline-sync 

15) Criar a função main depois de importar o pacote const readline.... 
