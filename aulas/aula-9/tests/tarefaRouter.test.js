const supertest = require('supertest'); 
const app = require('../app'); 
const request = supertest(app); 

let id = null; 

const url = '/tarefas'; 


describe('Testes do recurso /tarefas', () => { 
    test('POST / deve retornar 201', async() => { 
        const response = await request.post(url).send({nome: "Estudar"});
        expect(response.status).toBe(201); 
        expect(response.body._id).toBeDefined(); //testa se o id tá definido. 
        expect(response.body.nome).toBe("Estudar"); 
        expect(response.body.concluida).toBe(false);
        id = response.body._id ; 
    }); 

    test('POST / deve retornar 422', async() => { 
        const response = await request.post(url); 
        expect(response.status).toBe(422); 
        expect(response.body.msg).toBe("Nome da tarefa é obrigatório")
    }); 

    test('GET / deve retornar 200', async() => { 
        const response = await request.get(url); 
        expect(response.status).toBe(200); 
        expect(Array.isArray(response.body)).toBe(true); //testa se a resposta vem como um array. 
    }); 

    test('GET /id deve retornar 200', async() => { 
        const response = await request.get(`${url}/${id}`); 
        expect(response.status).toBe(200); 
        expect(response.body._id).toBeDefined(); 
        expect(response.body.nome).toBe("Estudar"); 
        expect(response.body.concluida).toBe(false); 
    }); 

    test('GET /id deve retornar 400', async() => { 
        const response = await request.get(`${url}/0`); //tratar um id inválido, que não existe. 
        expect(response.status).toBe(400); 
        expect(response.body.msg).toBe("ID inválido.") ; //tem que ser a mesma mensagem passada lá na lógica.
    }); 

    test('GET /id deve retornar 404', async() => { 
        const response = await request.get(`${url}/000000000000000000000000`); //tratar um Id válido só que não existe no banco. 
        expect(response.status).toBe(404); 
        expect(response.body.msg).toBe("Tarefa não encontrada!") ; //tem que ser a mesma mensagem passada lá na lógica.
    }); 

    test('PUT /id deve retornar 200', async() => { 
        const response = await request 
        .put(`${url}/${id}`)
        .send({nome: 'Estudar Express', concluida: true}); 
        expect(response.status).toBe(200); 
        expect(response.body.nome).toBe("Estudar Express");
        expect(response.body.concluida).toBe(true);
    }); 

    test('PUT /id deve retornar 400', async() => { 
    const response = await request.get(`${url}/0`); //tratar um id inválido, que não existe. 
    expect(response.status).toBe(400); 
    expect(response.body.msg).toBe("ID inválido.") ; //tem que ser a mesma mensagem passada lá na lógica.
    }); 

    test('PUT /id deve retornar 404', async() => { 
    const response = await request.put(`${url}/000000000000000000000000`); //tratar quando passamos um dado que não faz sentido, 24 zeros é maior do que a chave permitida pelo mongoDB.
    expect(response.status).toBe(404); 
    expect(response.body.msg).toBe("Tarefa não encontrada!") ; //tem que ser a mesma mensagem passada lá na lógica.
    }); 

    test('PUT /id deve retornar 422', async() => { 
    const response = await request 
    .put(`${url}/${id}`)
    .send({nome: '', concluida: true});  //tentando passar dado vazio e ele tá passando -> Update não passa na validação. Ele vai passar vazio e vai funcionar
    expect(response.status).toBe(422); 
    expect(response.body.msg).toBe("Nome da tarefa é obrigatório"); 
    }); 

    test('DELETE /id deve retornar 204', async() => { 
        const response = await request.delete(`${url}/${id}`); 
        expect(response.status).toBe(204)
    }); 
        test('DELETE /id deve retornar 400', async() => { 
    const response = await request.delete(`${url}/0`); //tratar um id inválido, que não existe. 
    expect(response.status).toBe(400); 
    expect(response.body.msg).toBe("ID inválido.") ; //tem que ser a mesma mensagem passada lá na lógica.
    }); 

    test('DELETE /id deve retornar 404', async() => { 
        const response = await request.delete(`${url}/${id}`); 
        expect(response.status).toBe(404)
    }); 
})
