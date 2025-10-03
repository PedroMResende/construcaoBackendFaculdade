1) criar o docker-compose.yaml ; 

subir os services que iremos utilizar ; 

dois espaços é a sintaxe do services (a identação)  ;

services: 
  


2) declara tudo e tal e depois sobe o comando docker compose up -d ; 

3) docker compose exec db mongosh. -> entra no banco de dados (MongoDB); 

show dbs -> mostra os bancos de dados criados. 

quero usar o local -> use `nome do banco` (Exemplo: use local) ; 

use meubanco -> já cria um banco de dados chamado meubanco

show collections -> mostra as collections lá dentro, os objetos JSON. 

db.usuarios.insertOne({nome: "Jose", email:"jose@esb.br"}) -> já cria a collection usuarios e insere na collection o objeto json.

db.usuarios.find({}) -> procura o que tem lá dentro de usuarios. Retorna a collection. 

db.usuarios.find({nome: "Maria"}) -> procura o objeto que o nome é Maria. 

db.collection.find => select 

db.collection.insertOne => insert 

db.collection.updateOne => update 

db.usuarios.deleteOne({nome: "Maria"}) => delete

db.collection.updateOne({filtro: "valor"}, {$set: {campo: "novo valor"}})
                            filtro                  o que vai atualizar

db.usuarios.find({}, {_id:0, nome:1}) -> procura o que tem na collection usuarios , o que tem 0 ele mostra o que tem 1 ele não mostra. ou seja, mostra o nome e nao mostra o id. 

4) abre o mongoDB atlas 

-> cluster é sua máquina, sua nuvem. 

database access -> para dar permissões e coisas do tipo. (DBA)

configurar o IP -> add an IP adress. 

# Aula de Docker + MongoDB

## 1) Criar o `docker-compose.yaml`

- Subir os serviços que iremos utilizar.  
- Atenção: dois espaços é a sintaxe de indentação do `services`.  

```yaml
services:
  db:
    image: mongo
    ports:
      - "27017:27017"
```

## 2) Subir os serviços

```bash
docker compose up -d
```

## 3) Acessar o MongoDB

```bash
docker compose exec db mongosh
```

### Comandos básicos

- `show dbs` → mostra os bancos de dados criados  
- `use local` → acessa o banco local  
- `use meubanco` → cria o banco de dados `meubanco`  

### Collections

```js
show collections
```

- Criar e inserir usuário:
```js
db.usuarios.insertOne({nome: "Jose", email:"jose@esb.br"})
```

- Consultar:
```js
db.usuarios.find({})
db.usuarios.find({nome: "Maria"})
```

- Atualizar:
```js
db.usuarios.updateOne({nome: "Maria"}, {$set: {email: "maria@novoemail.com"}})
```

- Deletar:
```js
db.usuarios.deleteOne({nome: "Maria"})
```

- Exibir apenas alguns campos:
```js
db.usuarios.find({}, {_id:0, nome:1})
```

## 4) MongoDB Atlas

- **Cluster**: sua máquina/nuvem.  
- **Database Access**: gerenciar permissões (DBA).  
- **Configurar IP**: `Add IP Address` para liberar acesso.
