var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Empresa = require('../models').Empresa;

router.post('/cadastrar', function (req, res, next) {
	console.log('Criando uma empresa');

	Empresa.create({
		nomeEmpresa: req.body.nome,
		cnpj: req.body.cnpjEmpresa,
		telefone1: req.body.telefoneEmpresa1,
		logradouro: req.body.ruaEmpresa,
		numLogradouro: req.body.numEmpresa,
		bairro: req.body.bairroEmpresa,
		cidade: req.body.cidadeEmpresa,
		cep: req.body.cepEmpresa,
		emailEmpresa: req.body.emailEmpresa,
		senhaEmpresa: req.body.senhaEmpresa
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.post('/autenticar', function (req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var login = req.body.login;
	var senha = req.body.senha;

	let instrucaoSql = `select * from empresa where emailEmpresa='${login}' and senhaEmpresa='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Empresa
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.post('/buscar_empresa/:cnpj', function (req, res, next) {
	console.log('Recuperando dados da empresa');
	var cnpj = req.params.cnpj;
	let instrucaoSql = `select * from empresa where cnpj='${cnpj}'`;

	sequelize.query(instrucaoSql, {
		model: Empresa
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.post('/atualizar/:idEmpresa', function (req, res, next) {
	let idEmpresa = req.params.idEmpresa;
	let nomeEmpresa = req.body.nomeEmpresa;
	let cnpj = req.body.cnpj;
	let telefone1 = req.body.telefone1;
	let logradouro = req.body.logradouro;
	let numLogradouro = req.body.numLogradouro;
	let bairro = req.body.bairro;
	let cidade = req.body.cidade;
	let cep = req.body.cep;

	let instrucaoSql = `update empresa set nomeEmpresa = '${nomeEmpresa}', cnpj = ${cnpj}, telefone1 = ${telefone1}, logradouro = '${logradouro}', numLogradouro = '${numLogradouro}', bairro = '${bairro}', cidade = '${cidade}', cep = ${cep} where idEmpresa = ${idEmpresa}`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Empresa
	}).then(resultado => {
		console.log(`Update realizado: ${resultado}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

module.exports = router;