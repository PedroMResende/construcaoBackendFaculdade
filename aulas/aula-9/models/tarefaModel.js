const mongoose = require('mongoose') ; 

const schema = new mongoose.Schema({
    nome: {
        type: String, 
        required: [true, 'Nome da tarefa é obrigatório'], //trata a mensagem de quando não é passado um nome. 
        trim: true, //remove espaços em branco na passagem do nome
    },
    concluida: Boolean,
}); 

//esse schema é pra criar um modelo do que vai subir pro mongoose, porque senão ele sobe qualquer coisa. Tipo uma interface JAVA. 

module.exports = mongoose.model('Tarefa', schema); 

