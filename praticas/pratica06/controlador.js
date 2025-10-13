const Tarefa = require('./modelo'); 

async function adicionarTarefa(nome) { 
    const tarefa = new Tarefa(nome); 
    await tarefa.inserir(); 
}; 

async function buscarTarefa(nome) { 
    const tarefa = new Tarefa(nome); 
    await tarefa.buscar(); 
    return tarefa; 
}; 

async function atualizarTarefa(nome,nomeAlt,concluida) { 
    const tarefa = new Tarefa(nome); 
    await tarefa.buscar(); 
    if(tarefa.id){
        tarefa.nome = nomeAlt;
        tarefa.concluida = concluida; 
        await tarefa.alterar(); 
    }
}; 

async function removerTarefa(nome){
    const tarefa = new Tarefa(nome); 
    await tarefa.buscar(); 
    if(tarefa.id){
        await tarefa.deletar();
    }
}; 

module.exports = {
    adicionarTarefa, 
    buscarTarefa, 
    atualizarTarefa,
    removerTarefa,
}; 

