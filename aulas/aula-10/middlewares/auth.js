const jwt = require("jsonwebtoken"); 

function verificarToken(req,res,next) { 
    const {authorization} = req.headers; 

    try { 
        const payload = jwt.verify(authorization, process.env.JWT_SEGREDO)
        req.payload = payload ; 
        next(); 
    } catch (err) { 
        res.status(401).json({msg: "Token Inválido"});
    }
}

function gerarToken(payload) { 
    try { 
        const token = jwt.sign(payload, process.env.JWT_SEGREDO); //gera o token e faz a assinatura digital 
        return token; 
    } catch(err) { 
        throw Error("Erro ao gerar token")
    }
} //payload é tipo como se fosse o body do token, é o termo usado na tokenização

module.exports = {verificarToken, gerarToken}; 

