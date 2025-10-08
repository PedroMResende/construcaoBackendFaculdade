const {MongoClient} = require('mongodb'); 

const url ='mongodb+srv://usrTarefas:abcd1234@cluster0.2xawhs2.mongodb.net/'; 

const client = new MongoClient(url); 



async function conecta() { 
    try { 
        await client.connect() ; //conecta no mongoDB. 
        return client.db('agenda'); //já cria o banco de dados chamado agenda, não precisa criar antes, ele automaticamente já cria. 
    } catch (e) { 
        console.log("Erro ao conectar no MongoDB: ", e.message); 
    }
}

module.exports = conecta; //exporta a função conecta. 