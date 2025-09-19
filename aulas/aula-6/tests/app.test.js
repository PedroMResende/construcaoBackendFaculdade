const supertest = require ('supertest'); 
const app = require('../app'); 
const request = supertest(app); 

const url = "/tarefas"; 

describe('Testes da rota /tarefas' , () => { 
    let id ; 

    test("GET / deve retornar 200", async () => { 

        const response = await request.get(url); 
        expect(response.status).toBe(200); //espera o status de resposta 200 ; 
        expect(response.headers['content-type']).toMatch(/json/); //espera que o content-type do headers seja um JSON
        expect(response.body).not.toBeNull() ; //espera que o conteúdo do body não seja nulo 
    }); 

    test("POST / deve retornar 201", async() => { 
        const response = await request.post(url).send({
            nome: "Estudar Express", 
            concluida: false, 
        }); 
        expect(response.status).toBe(201) ;
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body['id']).toBeDefined();
        id = response.body['id']; 
        expect(response.body['nome']).toMatch("Estudar Express"); 
        expect(response.body['concluida']).toBeFalsy(); 
    }); 

    test("GET /id retorna 200", async() => { 
        const response = await request.get(`${url}/${id}`); 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body['id']).toBe(id); //id que tá recebendo é o id que foi passado? 
        expect(response.body['nome']).toMatch('Estudar Express'); 
        expect(response.body['concluida']).toBeFalsy(); 

    }); 

    test("GET /id retorna 404", async() => { 
        const response = await request.get(`${url}/0`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body['msg']).toBe('Tarefa não encontrada.');
    }); 

    test("PUT /id retorna 200", async() => { 
        const response = await request
        .put(`${url}/${id}`)
        .send({nome: "Estudar para p1", concluida:true}); 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.id).toBe(id); //pode ser responde.body['id']
        expect(response.body.nome).toBe("Estudar para p1"); 
        expect(response.body.concluida).toBe(true); 
    }); 

    test("PUT /id retorna 404", async() => { 
        const response = await request.put(`${url}/0`); 
        expect(response.status).toBe(404); 
        expect(response.header['content-type']).toMatch(/json/); 
        expect(response.body['msg']).toBe('Tarefa não encontrada.')
    }); 

    test("DELETE /id retorna 204", async() => { 
        const response = await request.delete(`${url}/${id}`); 
        expect(response.status).toBe(204); 
        expect(response.body).toStrictEqual({}); 
    }); 

    test("DELETE /id retorna 404", async() => { 
        const response = await request.delete(`${url}/0`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body['msg']).toBe('Tarefa não encontrada.') ; 
    })






}); 



