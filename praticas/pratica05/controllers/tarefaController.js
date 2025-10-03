const tarefaModel = require('../models/tarefaModel.js'); 

const listar = (req,res) => {
    const resultado = tarefaModel.listar() ;
    res.json(resultado);  
}; 

const buscarTarefa = (req,res,next) => { 
    const {id} = req.params; 
    const tarefaEncontrada = tarefaModel.obter(id); 
    if(tarefaEncontrada) { 
        req.tarefa=tarefaEncontrada; 
        return next(); 
    }; 
    res.status(404).json({msg:"Tarefa não encontrada."}); 
}; 

const buscarPeloId = (req,res) => { 
    const {id} = req.params; 
    const resultado = tarefaModel.buscarPeloId(id); 
    res.status(200).json(resultado) ; 
}; 

const criar = (req,res) => { 
    const resultado = tarefaModel.criar(req.body); 
    res.status(201).json(resultado); 
}; 

const atualizar = (req,res) => { 
    const {id} = req.params ; 
    const resultado = tarefaModel.atualizar({id, ...req.body}); 
    res.json(resultado) 
} ; 

const remover = (req,res) => { 
    const {id} = req.params ; //já tira o id de req.params e nomeia de id -> ranca e nomeia, em uma linha de código.
    const resultado = tarefaModel.remover(id); 
    res.status(204).end(); 
} ; 


module.exports = {listar, buscarPeloId, criar, atualizar, remover, buscarTarefa}; 