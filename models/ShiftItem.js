import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class ShiftItem extends Model {}

ShiftItem.init(
	{
		// id: {
		// 	type: DataTypes.INTEGER,
		// 	autoIncrement: true,
		// 	primaryKey: true
		// },
		// ShiftId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	unique: false
		// },
		// ItemId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	unique: false
		// },
		// stock: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true,
		// 	unique: false
		// }
	},
	{
		sequelize
	}
);

export default ShiftItem;
