const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose'); 

const apiDocsRouter = require('./routes/apidocsRouter'); 
const usuariosRouter = require('./routes/usuariosRouter'); 

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}` ;

mongoose.connect(url)
.then(() => {
    console.log('CONECTADO NO MONGODB')
})
.catch((err) => { 
    console.log('ERRO NA CONEXÃO COM O BANCO DE DADOS');
    console.log(err.message); 
})

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', apiDocsRouter); 
app.use('/usuarios', usuariosRouter); 


module.exports = app;
