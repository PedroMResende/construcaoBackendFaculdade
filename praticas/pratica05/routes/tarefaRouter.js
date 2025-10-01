const express = require('express'); 
const tarefaController = require('../controllers/tarefaController.js')
const router = express.Router(); 



router.get('/', tarefaController.listar) ; 

router.get('/:id', tarefaController.buscarTarefa, tarefaController.buscarPeloId) ;

router.post('/', tarefaController.criar) ; 

router.put('/:id', tarefaController.buscarTarefa, tarefaController.atualizar) ; 

router.delete('/:id', tarefaController.buscarTarefa, tarefaController.remover) ; 

module.exports = router ; 