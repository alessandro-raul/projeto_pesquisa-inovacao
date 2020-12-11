var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Sensor = require('../models').Sensor;

router.post('/atribuir/:fkVeiculo/:idSensor', function (req, res, next) {
	let fkVeiculo = req.params.fkVeiculo;
	let idSensor = req.params.idSensor;

	console.log(fkVeiculo);
	console.log(idSensor);

	let instrucaoSql = `update sensor set fkVeiculo = '${fkVeiculo}' where idSensor = ${idSensor}`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Sensor
	}).then(resultado => {
		console.log(`Update realizado: ${resultado}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

module.exports = router;