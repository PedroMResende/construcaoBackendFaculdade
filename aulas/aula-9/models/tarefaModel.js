const mongoose = require('mongoose') ; 

const schema = new mongoose.Schema({
    nome: String,
    concluida: Boolean,
}); 

//esse schema é pra criar um modelo do que vai subir pro mongoose, porque senão ele sobe qualquer coisa. Tipo uma interface JAVA. 

module.exports = mongoose.model('Tarefa', schema); 

