const supertest = require('supertest'); 
const app = require('../app');
const request = supertest(app); 
require('dotenv').config()

let id = null;
let token = null; 
let novoToken = null;
const urlUsuarios = '/usuarios'; 
const urlLogin = '/usuarios/login'; 
const urlRenovar = '/usuarios/renovar'; 


describe('TESTES NO RECURSO /usuarios', () => { 
    test('POST /usuarios deve retornar 201', async() => {
        const response = await request.post(urlUsuarios)
        .send({
            email: "usuario@mail.com", 
            senha: "abcd1234"
        }); 
        expect(response.status).toBe(201); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body._id).toBeDefined(); 
        expect(response.body.email).toBe("usuario@mail.com"); 

        id = response.body._id;
    }); 

    test('POST /usarios deve retornar 422 (SEM CORPO)', async() =>{ 
        const response = await request.post(urlUsuarios); 
        expect(response.status).toBe(422); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe('Email e senha são obrigatórios'); 
    }); 

    test('POST /usuarios/login deve retornar 200', async() => { 
        const response = await request.post(urlLogin)
        .send({
            usuario: "usuario@mail.com", 
            senha: "abcd1234"
        });
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']); 
        expect(response.body.token).toBeDefined(); 
        token = response.body.token; 
    }); 

    test('POST /usuarios/login deve retornar 401 ( CREDENCIAIS INVÁLIDAS )', async() => {
        const response = await request.post(urlLogin); 
        expect(response.status).toBe(401); 
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.msg).toBe("Credenciais inválidas"); 
    }); 

    test('POST /usuarios/renovar deve retornar 200', async() => { 
        const response = await request
        .post(urlRenovar)
        .set('Authorization', `Bearer ${token}`); 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']); 
        expect(response.body.token).toBeDefined(); 
    }); 

    test('POST /usuarios/renovar deve retornar 401 ( TOKEN INVÁLIDO )', async() => { 
        const response = await request.post(urlRenovar)
        .set('Authorization', `Bearer 123456789`); 
        expect(response.status).toBe(401); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Token inválido"); 
    }); 

    test('DELETE /usuarios/:id deve retornar 204', async() => {
        const response = await request.delete(`${urlUsuarios}/${id}`)
        .set('Authorization', `Bearer ${token}`); 
        expect(response.status).toBe(204); 
    });

    
})