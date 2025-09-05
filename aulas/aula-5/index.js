// importa o framework 

const express = require("express"); 

// criar uma instancia da aplicação 

const app = express() ; 

// // primeira forma


// arrow-function (equivale, a mesma coisa )
// middleware de app
app.use( (req,res, next) => { 
    console.log("passei aqui")
    next(); 
})

// middleware de rotas 
const router = express.Router(); 

router.get('/', (req,res) => {
    res.send('Chegou aqui')
}) ; 

// quando dá o post recebe o 201 -> o send é a mensagem que aparecerá. 

router.post('/', (req,res) => { 
    res.status(201).send("Inserido com sucesso")
})

router.get("/:id", (req,res) => { 
    const {id} = req.params ;  // {id:1, param2:5, param3:6 } -> desestruturação do objeto -> pegar só uma parte de tudo que o objeto oferece. 
    if(id==1) return res.send("Achei")  
    throw Error("Não achei")
    })

// acima se lança um erro, pra ele entrar no erro embaixo. 

app.use(router); 

// middleware de erro  -> encapsular os erros.

app.use((err,req,res,next) => { 
    console.log(err.stack); 
    res.status(500).send("Algo de errado não está certo!")
})


// subir a aplicação (inicializar) -> geralmente é último código. 
app.listen(3000, () => {
    console.log("App está ON")
})


