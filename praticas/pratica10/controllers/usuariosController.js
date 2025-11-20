const {cifrarSenha, gerarToken,compararSenha} = require('../middlewares/authMiddleware'); 
const usuariosModel = require('../models/usuariosModel'); 

async function criar(req,res) {
    try{
    const senhaCifrada = cifrarSenha(req.body.senha); 
    const novoUsuario = await usuariosModel.create({
        email: req.body.email, 
        senha: senhaCifrada
    }); 
    return res.status(201).json({
        _id: novoUsuario._id, 
        email: novoUsuario.email
    })
    } catch(err){
        return res.status(422).json({msg:"Email e senha são obrigatórios"})
    }
}

async function entrar(req,res) {
    const {usuario:email,senha} = req.body; 
    const usuarioEncontrado = await usuariosModel.findOne({email: email});

    if(!usuarioEncontrado) {
        return res.status(401).json({msg:"Credenciais inválidas"});
    }

    
    const senhaValida = compararSenha(senha, usuarioEncontrado.senha);
    if(!senhaValida) {
        return res.status(401).json({msg:"Credenciais inválidas"})
    }
    const token = gerarToken({email});
    return res.status(200).json({token: `${token}`});
};

async function renovar(req,res) {
    const {email} = req.usuario;
    const token = gerarToken({email}); 
    console.log("TOKEN NOVOOOOOOO", token)
    console.log("ENTREI")
    res.status(200).json({token: `${token}`})
};

async function remover(req,res) {
    const {id} = req.params
    const usuarioRemovido = await usuariosModel.findOneAndDelete({_id: id}); 

    return res.status(204).end(); 
}
module.exports = {criar, entrar,renovar,remover}