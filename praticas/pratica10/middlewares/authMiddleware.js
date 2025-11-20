const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt'); 
require('dotenv').config();

function verificarToken(req,res,next) { 
    const {authorization} = req.headers; 
    console.log(req.headers)

    if(!authorization) {
        return res.status(401).json({msg: "Não autorizado"})
    }; 

    try {
        const [ ,token] = authorization.split(" ");
        req.usuario = jwt.verify(token, process.env.JWT_SECRET);
        console.log('PASSEI AQUI',req.usuario); 
        next(); 
    } catch(err) { 
        return res.status(401).json({msg: "Token inválido"})
    };
};

function gerarToken(payload) {
    const expiresIn = process.env.JWT_EXPIRES ; 
    
    try {
        return jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            {expiresIn},
        ); 
    } catch(err) { 
        throw Error("Erro ao gerar token")
    }; 
}; 

function cifrarSenha(senha) {
    const salto = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(senha, salto); 
    
    return hash; 
}; 

function compararSenha(senha,hash) { 
    return bcrypt.compareSync(senha,hash)
};

module.exports = { 
    verificarToken, gerarToken, cifrarSenha, compararSenha
}; 