'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Sensor = sequelize.define('Sensor',{
		idSensor: {
			field: 'idSensor',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		fkVeiculo: {
			field: 'fkVeiculo',
            type: DataTypes.INTEGER,
            foreignKey: true,
			allowNull: false
		},
	}, 
	{
		tableName: 'sensor', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Sensor;
};
