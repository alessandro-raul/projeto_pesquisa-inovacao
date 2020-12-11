process.env.NODE_ENV = 'production';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var empresasRouter = require('./routes/empresas');
var motoristasRouter = require('./routes/motoristas');
var sensoresRouter = require('./routes/sensores');
var viagensRouter = require('./routes/viagens');
var veiculosRouter = require('./routes/veiculos');
var leiturasRouter = require('./routes/leituras');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/empresas', empresasRouter);
app.use('/motoristas', motoristasRouter);
app.use('/viagens', viagensRouter);
app.use('/sensores', sensoresRouter);
app.use('/veiculos', veiculosRouter);
app.use('/leituras', leiturasRouter);

module.exports = app;
