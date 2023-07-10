import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class ShiftItem extends Model {}

ShiftItem.init(
	{
		ShiftId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: false
		},

		ItemId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: false
		},

		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1
		}
	},
	{
		sequelize
	}
);

export default ShiftItem;
