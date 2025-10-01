const supertest = require('supertest') ; 
const app = require('../app') ; 
const request = supertest(app) ; 

const url = '/tarefas'

describe('Testes da rota tarefas', () => { 
    let id ; 

    test('GET /deve retornar 200', async() => { 
        const response = await request.get(url); 
        expect(response.headers['content-type']).toMatch(/json/); 
    }) ; 

    test('POST /deve retornar 201', async() => { 
        const response = await request.post(url).send({
            nome : "estudar node", 
            concluida: false, 
        }); 
        expect(response.status).toBe(201); 
        expect(response.header['content-type']).toMatch(/json/); 
        expect(response.body['id']).toBeDefined() ; 
        id = response.body['id'];
    }) ; 

    test('GET /id retorna 200', async() => { 
        const response = await request.get(`${url}/${id}`); 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
    }) ; 

    test('GET /tarefas/1 retorna 404', async() => { 
        const response = await request.get(`${url}/0`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body['msg']).toBe('Tarefa não encontrada.'); 
    }) ; 

    test('PUT /tarefas/id retorna 200', async() => { 
        const response = await request
        .put(`${url}/${id}`)
        .send({
            nome: "Estudar Node e Express",
            concluida: true,
        })
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.id).toBe(id); 
        expect(response.body.nome).toBe("Estudar Node e Express"); 
        expect(response.body.concluida).toBe(true)
    }) ; 

    test('PUT /tarefas/1 retorna 404', async() => {
        const response = await request.put(`${url}/0`) ; 
        expect(response.status).toBe(404) ; 
        expect(response.headers['content-type']).toMatch(/json/); 
    }) ; 

    test('DELETE /tarefas/id 204', async() => { 
        const response = await request.delete(`${url}/${id}`);
        expect(response.status).toBe(204); 
        expect(response.body).toStrictEqual({}); 
    }) ;
    
    test ('DELETE /tarefas/1 retorna 404', async() => { 
        const response = await request.delete(`${url}/0`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body['msg']).toBe('Tarefa não encontrada.'); 
    }) ; 
}); 

