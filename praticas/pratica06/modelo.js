const dbConnect = require('./database');


class Tarefa { 
    db = null
    collection = null

    constructor(nome, concluida){
        this.nome = nome 
        this.concluida = concluida 
        this.id = null ;
    };

    async init(){
        this.db = await dbConnect(); 
        this.collection = this.db.collection("Tarefas"); 
    }; 

    async inserir(){
        await this.init(); 
        const resultado = await this.collection.insertOne({
            nome: this.nome, 
            concluida: this.concluida
        }); 
        this.id = resultado.insertedId; 
        console.log('Tarefa inserida com sucesso:', resultado); 
    };

    async alterar(){ 
        await this.init(); 
        await this.collection.updateOne(
            {_id:this.id}, 
            {$set: { 
                nome: this.nome, 
                concluida: this.concluida
            }
            }
        ); 
        console.log('Tarefa atualizada com sucesso!'); 
    }; 

    async deletar(){
        await this.init(); 
        await this.collection.deleteOne({nome:this.nome}); 
        console.log('Tarefa removida com sucesso.')
    };

    async buscar(){ 
        await this.init(); 
        const resultado = await this.collection.findOne({nome:this.nome}); 
        if(resultado){ 
        this.nome = resultado.nome; 
        this.concluida = resultado.concluida; 
        this.id = resultado._id; 
        }
        console.log('Tarefa encontrada:', resultado); 
        return resultado; 
    };
}

module.exports = Tarefa ; 