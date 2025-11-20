var express = require('express');
var router = express.Router();

const auth = require("../middlewares/auth"); 

router.post("/login", (req,res) => { 
  const {username, password} = req.body; 

  if(username === "jose@iesb.br" && password === "abcd1234"){
    const payload = {
      iss: "Minha API", 
      aud: "Você",
      email: username, 
      nome: "Jose",
    } //informação que vai transitar com o token, infos que serão publicas. Nunca passar informações confidencias
    try {
      return res.json({token: auth.gerarToken(payload)})
    } catch(err) { 
      return res.status(500).json({msg: err.message}); 
    }
  }; 
  return res.status(401).json({msg: "Credenciais invalidas"})
}); 

router.post('/renovar', auth.verificarToken, auth.renovarToken); 

module.exports = router;
