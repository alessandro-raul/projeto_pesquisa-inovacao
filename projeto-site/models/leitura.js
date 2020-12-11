'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
	let Leitura = sequelize.define('Leitura', {
		fkSensor: {
			field: 'fkSensor',
			type: DataTypes.INTEGER,
			primaryKey: true,
			foreignKey: true,// NÃO existe DATETIME. O tipo DATE aqui já tem data e hora
			allowNull: false
		},
		logDados: {
			field: 'logDados',
			type: DataTypes.DATE,
		},
		temperatura: {
			field: 'temperatura',
			type: DataTypes.REAL,
			allowNull: false
		},
		umidade: {
			field: 'umidade',
			type: DataTypes.REAL,
			allowNull: false
		}
	},
		{
			tableName: 'dados',
			freezeTableName: true,
			underscored: true,
			timestamps: false,
		});

	return Leitura;
};
