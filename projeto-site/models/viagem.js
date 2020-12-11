'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Viagem = sequelize.define('Viagem',{
		idViagem: {
			field: 'idViagem',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		fkveiculoviagem: {
			field: 'fkveiculoviagem',
			type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
		},
		fkmotoristaviagem: {
			field: 'fkmotoristaviagem',
			type: DataTypes.BIGINT,
            allowNull: false,
            foreignKey: true
		},
		statusViagem:{
			field: 'statusViagem',
			type: DataTypes.INTEGER,
            allowNull: false,
		}
	}, 
	{
		tableName: 'viagem', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Viagem;
};
