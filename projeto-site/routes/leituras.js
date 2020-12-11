var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;

router.get('/ultimas/:idcaminhao', function (req, res, next) {
	const limite_linhas = 7;
	var idcaminhao = req.params.idcaminhao;
	console.log(`Recuperando as ultimas ${limite_linhas} leituras`);
	const instrucaoSql = `select top 5 temperatura, umidade, logDados, FORMAT(logDados,'HH:mm:ss') as momento_grafico, idSensor
	from dados
	join [dbo].[Sensor] on idSensor = fkSensor
	join [dbo].[Veiculo] on idVeiculo = fkVeiculo
	where idveiculo = ${idcaminhao}
	order by logDados desc`;

	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true
	})
		.then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
});


router.get('/tempo-real/:idcaminhao', function (req, res, next) {
	console.log('Recuperando caminhões');
	var idcaminhao = req.params.idcaminhao;

	let instrucaoSql = `select top 1 temperatura, umidade, logDados, FORMAT(logDados,'HH:mm:ss') as momento_grafico, idSensor
	from dados
	join [dbo].[Sensor] on idSensor = fkSensor
	join [dbo].[Veiculo] on idVeiculo = fkVeiculo
	where idveiculo = ${idcaminhao}
	order by logDados desc`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
});


router.get('/estatisticas/:idcaminhao', function (req, res, next) {

	console.log(`Recuperando as estatísticas atuais`);
	var idcaminhao = req.params.idcaminhao;
	const instrucaoSql = `select temperatura, umidade from dados
	join [dbo].[Sensor] on idSensor = fkSensor 
	join [dbo].[Veiculo] on idVeiculo = fkVeiculo
	where idveiculo = ${idcaminhao} and logDados = 
    (select max(logDados) from [dbo].[Dados] 
    join [dbo].[Sensor] on idSensor = fkSensor 
	join [dbo].[Veiculo] on idVeiculo = fkVeiculo
    where idveiculo = ${idcaminhao})`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
});


module.exports = router;