var express = require('express');
var router = express.Router();
var Veiculo = require('../models').Veiculo;
var sequelize = require('../models').sequelize;

router.post('/cadastrar/:idEmpresa', function (req, res, next) {
	console.log('Cadastrando um veículo');
	Veiculo.create({
		modeloVeiculo: req.body.modeloVeiculo,
		placaVeiculo: req.body.placaVeiculo,
		tamanhoBau: req.body.tamanhoBau,
		fkEmpresaVeiculo: req.params.idEmpresa
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.post('/autenticar/:idEmpresa', function (req, res, next) {
	var idEmpresa = req.params.idEmpresa;
	let instrucaoSql = `
	select * from [dbo].[Veiculo] 
	join [dbo].[Empresa] on fkEmpresaVeiculo = idEmpresa
	join [dbo].[Sensor] on fkVeiculo = idVeiculo
	join [dbo].[Dados] on fkSensor = idSensor
	join [dbo].[Viagem] on fkVeiculoviagem = idVeiculo
	join [dbo].[Motorista] on cpfMotorista = fkmotoristaviagem 
	where idEmpresa = ${idEmpresa} and statusViagem = 1
	order by logDados desc`;
	sequelize.query(instrucaoSql, {
		model: Veiculo
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado)
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.post('/todos_veiculos/:idEmpresa', function (req, res, next) {
	var idEmpresa = req.params.idEmpresa;
	let instrucaoSql = `select * from [dbo].[Viagem] 
	join [dbo].[Veiculo] v on fkVeiculoViagem = idVeiculo 
	where v.fkEmpresaVeiculo = 1000 and statusViagem = 0
	union
	select * from [dbo].[Viagem] right join [dbo].[Veiculo] v on fkVeiculoViagem = idVeiculo 
	where v.fkEmpresaVeiculo = ${idEmpresa} and statusViagem is null;`;
	sequelize.query(instrucaoSql, {
		model: Veiculo
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado)
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.post('/recuperar_id/:placaVeiculo', function (req, res, next) {
	var placaVeiculo = req.params.placaVeiculo;
	let instrucaoSql = `select idVeiculo from veiculo where placaVeiculo = '${placaVeiculo}'`;
	sequelize.query(instrucaoSql, {
		model: Veiculo
	}).then(resultado => {
		res.json(resultado)
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

module.exports = router;