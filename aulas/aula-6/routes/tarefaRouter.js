const express = require('express'); 
const controller = require('../controllers/tarefaController'); 

const router = express.Router() ; 



router.get('/', controller.listarTarefa) ; 

router.post('/', controller.criarTarefa) ; 

router.get('/:id', controller.buscarTarefa, controller.obterTarefa) ; //passa pelo primeiro pelo buscarTarefa e depois entra no obter. 

router.put('/:id', controller.buscarTarefa, controller.atualizarTarefa) ; //passa pelo buscarTarefa primeiro e depois atualiza. 

router.delete('/:id',controller.buscarTarefa, controller.removerTarefa); //passa primeiro pelo buscarTarefa e depois remove. 


module.exports = router ; 