import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class ShiftItem extends Model {}

ShiftItem.init(
	{
		ShiftId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},

		ItemId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize
	}
);

export default ShiftItem;
