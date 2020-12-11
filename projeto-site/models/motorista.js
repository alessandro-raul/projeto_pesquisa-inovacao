'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Motorista = sequelize.define('Motorista',{
		cpfMotorista: {
			field: 'cpfMotorista',
			type: DataTypes.STRING,
			primaryKey: true,
			autoIncrement: false
		},		
		nomeMotorista: {
			field: 'nomeMotorista',
			type: DataTypes.STRING,
			allowNull: false
		},
		fkEmpresa: {
			field: 'fkEmpresa',
			type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
		},
		telefoneMotorista:{
			field: 'telefoneMotorista',
			type: DataTypes.INTEGER,
            allowNull: false,
		}
	}, 
	{
		tableName: 'motorista', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Motorista;
};
