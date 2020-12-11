var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Viagem = require('../models').Viagem;

router.post('/cadastrar/', function(req, res, next) {
	console.log('Cadastrando uma viagem');
	Viagem.create({
		fkveiculoviagem: req.body.fkVeiculo,
		fkmotoristaviagem: Number(req.body.fkMotorista),
		statusViagem: 1
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

router.post('/deletar/:idVeiculo', function(req, res, next) {
	var idVeiculo = req.params.idVeiculo;
	let instrucaoSql = `delete from viagem where fkveiculoviagem = ${idVeiculo}`;
	sequelize.query(instrucaoSql, {
		model: Viagem
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado)
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;