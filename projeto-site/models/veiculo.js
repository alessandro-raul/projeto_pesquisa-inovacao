'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Veiculo = sequelize.define('Veiculo',{
		idVeiculo: {
			field: 'idVeiculo',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		modeloVeiculo: {
			field: 'modeloVeiculo',
			type: DataTypes.STRING,
			allowNull: false
		},
		placaVeiculo: {
			field: 'placaVeiculo',
			type: DataTypes.STRING,
			allowNull: false
		},
		tamanhoBau: {
			field: 'tamanhoBau',
			type: DataTypes.FLOAT,
			allowNull: false
		},
		fkEmpresaVeiculo:{
			field: 'fkEmpresaVeiculo',
			type: DataTypes.INTEGER,
			foreignKey: true
		}
	}, 
	{
		tableName: 'veiculo', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Veiculo;
};
