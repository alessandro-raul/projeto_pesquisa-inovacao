var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Motorista = require('../models').Motorista;

router.post('/cadastrar/:fkEmpresa', function (req, res, next) {
	console.log('Cadastrando um motorista');
	Motorista.create({
		cpfMotorista: req.body.cpfMotorista,
		nomeMotorista: req.body.nomeMotorista,
		telefoneMotorista: req.body.telefoneMotorista,
		fkEmpresa: req.params.fkEmpresa /*req.body.fkEmpresa*/,
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.post('/pegar_motoristas/:idEmpresa', function (req, res, next) {
	var idEmpresa = req.params.idEmpresa;
	let instrucaoSql = `select * from motorista where fkEmpresa =${idEmpresa}`;
	sequelize.query(instrucaoSql, {
		model: Motorista
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado)
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


module.exports = router;