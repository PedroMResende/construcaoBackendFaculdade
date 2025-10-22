const Tarefa = require('../models/tarefaModel'); 
const mongoose = require('mongoose')

async function listar(req,res){
    try {
        const tarefas = await Tarefa.find({})
        return res.json(tarefas); 
    } catch(err) {
        res.status(500).json({msg: "Deu ruim :/" + err.message }) ; 
    }
}; 

async function criar(req,res){ 
    try { 
        const novaTarefa = await Tarefa.create({
        nome: req.body.nome, 
        concluida: false,
    }); 
    return res.status(201).json(novaTarefa); 
    } catch (err) { 
        if(err.errors) {  //confere se existe a propriedade errors dentro de err. 
            return res.status(422).json({msg: err.errors['nome'].message})  // pega a propriedade errors -> pega a prop nome -> pega a prop message 
            //isso pega os errors de validação lá do model que você criou, o required e etc...
        }

        return res.status(500).json({msg: "Deu ruim"})
    }
}; 

async function buscar(req,res, next){
    const {id} = req.params; 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({msg:"ID inválido."})
    }
    const tarefaEncontrada = await Tarefa.findOne({_id: id}) ; //no MongoDB tem que ter o underlineID.
    if(tarefaEncontrada){  
        req.tarefa = tarefaEncontrada; //acho a tarefa e guardo como uma propriedade da req.    
        return next(); 
    }
    return res.status(404).json({msg: "Tarefa não encontrada!"})
}; 

function exibir(req,res){ 
    return res.json(req.tarefa); 
}

async function atualizar(req,res){
    const {id} = req.params; 
    const tarefaAtualizada = await Tarefa.findOneAndUpdate(
        {_id:id}, 
        {...req.body}, 
        {new:true} //isso aqui passa o parâmetro pra retornar a tarefa atualizada, se não passar, retorna a tarefa encontrada.
    ); 
    return res.json(tarefaAtualizada); 
}

async function remover(req,res){
    const {id} = req.params ; 
    const tarefaRemovida = await Tarefa.findOneAndDelete({_id:id})
    return res.status(204).end();
}

module.exports = {listar,buscar,criar,exibir,atualizar,remover}