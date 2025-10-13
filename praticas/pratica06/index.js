const readline = require('readline-sync'); 
const controlador = require('./controlador'); 


function menu() {
    console.log("\n=== MENU DE TAREFAS ===");
    console.log("1 - Adicionar tarefa");
    console.log("2 - Buscar tarefa");
    console.log("3 - Atualizar tarefa");
    console.log("4 - Remover tarefa");
    console.log("5 - Sair");
}

async function escolherOpcao(opcao){
    switch(opcao){
        case "1":
            const nomeAdd = readline.question('Digite o nome da tarefa (para adicionar): '); 
            await controlador.adicionarTarefa(nomeAdd); 
            break;
        case "2": 
            const nomeBusca = readline.question('Digite o nome da tarefa (para buscar): ');
            await controlador.buscarTarefa(nomeBusca); 
            break; 
        case "3": 
            const nome = readline.question('Digite o nome da tarefa (para atualizar): '); 
            const nomeAtualizado = readline.question('Digite o novo nome da tarefa: ')
            const status = readline.question('Digite o status da tarefa: ')
            await controlador.atualizarTarefa(nome, nomeAtualizado,status); 
            break; 
        case "4": 
            const nomeDel = readline.question('Digite o nome da tarefa (para remover): '); 
            await controlador.removerTarefa(nomeDel); 
            break; 
        case "5": 
            console.log("Saindo..."); 
            process.exit(); 

        default: 
            console.log('Opção inválida!')
    }; 

};

async function main() { 
    while(true){
        menu(); 
        const opcao = readline.question('Digite a opção desejada: '); 
        await escolherOpcao(opcao)
    }
}; 

main()