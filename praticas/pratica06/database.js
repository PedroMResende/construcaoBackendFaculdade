const {MongoClient} = require('mongodb'); 
const url = 'mongodb+srv://usrTarefas:abcd1234@cluster0.2xawhs2.mongodb.net/'; 

const client = new MongoClient(url); //pra usar o MongoClient 

async function dbConnect() { 
    try { 
        await client.connect(); 
        return client.db('agenda'); 
    } catch (error) { 
        return console.log('Erro ao conectar no MongoDB:', error); 
    }
}

module.exports = dbConnect ; 



