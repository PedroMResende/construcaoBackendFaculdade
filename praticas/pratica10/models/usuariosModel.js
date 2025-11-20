const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    email: {
        type: String
    }, 
    senha: {
        type: String
    }
}); 

module.exports = mongoose.model('Usuario', userSchema);

