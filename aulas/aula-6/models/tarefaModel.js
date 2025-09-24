const tarefas = [] ; 

const listar = () => {
    return tarefas;
};

const criar = (data) => { 
    const novaTarefa = {
        ...data, 
        id: tarefas.length + 1
    }; 
    tarefas.push(novaTarefa); 
    return novaTarefa; 
}; 

const obter = (id) => {
    const tarefaEncontrada = tarefas.find((item) =>
    item.id === parseInt(id)
    ); 
    return tarefaEncontrada;
}; 

const atualizar = (data) => { 
    const tarefaEncontrada = tarefas.find((item) => item.id === parseInt(data.id)); 
    if(tarefaEncontrada) { 
    tarefaEncontrada.nome = data.nome; 
    tarefaEncontrada.concluida = data.concluida ;   
    }
    return tarefaEncontrada ; 
}; 

const remover = (id) => { 
    const posicao = tarefas.findIndex((item) => item.id === parseInt(id)) ; 
    if (posicao >=0){
        tarefas.splice(posicao,1); 
    }; 
    return posicao; 
}



module.exports = {listar, criar, obter, atualizar, remover}; 

