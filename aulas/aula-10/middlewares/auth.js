const jwt = require("jsonwebtoken"); 

//particularmente o auth.js tem duas funções -> verificar o token e gerar o token.

function verificarToken(req,res,next) { 
    const {authorization} = req.headers; 

    try { 
        const token = authorization.split(" ")[1]; 
        const payload = jwt.verify(token, process.env.JWT_SEGREDO)
        req.payload = { 
            iss: payload.iss, 
            aud: payload.aud, 
            email: payload.email, 
            nome: payload.nome
        } ; 
        next(); 
    } catch (err) { 
        res.status(401).json({msg: "Token Inválido"});
    }
}

function gerarToken(payload) { 
    const expiresIn = 30; 
    try { 
        const token = jwt.sign(
            payload,
            process.env.JWT_SEGREDO, 
            {expiresIn}
            ); //gera o token e faz a assinatura digital 
        return token; 
    } catch(err) { 
        throw Error("Erro ao gerar token")
    }
} //payload é tipo como se fosse o body do token, é o termo usado na tokenização

function renovarToken(req,res){
    try {
        const payload = req.payload; 
        res.json({token : gerarToken(payload)});
    } catch (err) { 
        res.status(500).json({msg: "Erro ao renovar o token"})
    }
}

module.exports = {verificarToken, gerarToken, renovarToken}; 

