const express = require("express"); 

const tarefas = [ 
    {id: 1, nome: "Estudar middleware", concluida:false }, 
    {id: 2, nome: "Praticar express", concluida:true} 
]

// criando uma instância express
const app = express(); 

// criando o middleware integrado pra processar requisições com JSON no body.
app.use(express.json()); 

// middleware de aplicação -> tudo passa aqui. -> bom para validações 

app.use((req,res,next) => { 
    const agora = new Date(); 
    console.log("ENTREI"); 
    console.log(`A url acessada é: ${req.url}`); 
    console.log(`O método utilizado é: ${req.method}`);
    console.log(`Momento da requisição: ${agora.toLocaleString("pt-BR")}`)
    next(); 
}); 

// middleware de rotas 
const router = express.Router('/tarefas'); 

router.get('/', (req,res) => { 
    res.send(tarefas); 
}); 

router.post('/', (req,res) => { 
    // tarefas=[...tarefas, req.body]
    tarefas.push(req.body); 
    res.status(201).send(tarefas);
}); 

router.get('/:id', (req,res) => { 
    const {id} = req.params ; 
    throw Error("Tarefa não localizada.")
    res.send(tarefas.find(item => item.id==id)); 
}); 

router.put('/:id', (req,res) => { 
    const {id} = req.params ; 
    const tarefaIndex = tarefas.findIndex(item => item.id===Number(id)); 
    tarefas[tarefaIndex] = {...tarefas[tarefaIndex], ...req.body}; 

    // O spread { ...tarefas[tarefaIndex], ...req.body } cria um novo objeto que começa com as 
    // propriedades atuais e depois aplica as propriedades de req.body, sobrescrevendo as que coincidirem.
	// Ordem importa: propriedades em req.body substituem as originais.
    throw Error("Tarefa não localizada.")
    res.send(tarefas[tarefaIndex]); 

}); 

router.delete('/:id', (req,res) => { 
    const {id} = req.params ;     
    const tarefaIndex = tarefas.findIndex(item => item.id===Number(id)); 
        // passa na req o id = 1 -> ele transforma pra 0 porque no vetor é 0. 
        // deleta 1 elemento a partir do indice 0 do vetor, ou seja, onde o id=1. 
    tarefas.splice(tarefaIndex, 1); 
    // splice(y, x)  deleta x elementos a partir do indice y.  
    throw Error("Tarefa não localizada"); 
    res.status(204).send(); 
})

// utilizando o middleware das rotas.
app.use("/tarefas", router); 

app.use((err,req,res,next) => { 
    res.status(400).send(err.message)
})
// subir a aplicação (inicializar) -> ouvindo a porta 3000
app.listen(3000, () => { 
    console.log("SUBIU")
})

module.exports = app ; 