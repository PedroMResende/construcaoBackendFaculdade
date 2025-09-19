const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index'); //aqui tá só importando. 
const tarefaRouter = require('./routes/tarefas'); //aqui tá só importando. 

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter); //bateu barra, chama indexRouter.
app.use('/tarefas', tarefaRouter); //chegou em tarefas? manda pro tarefaRouter que lá resolve. 






module.exports = app;

