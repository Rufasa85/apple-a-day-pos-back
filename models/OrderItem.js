import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class OrderItem extends Model {}

OrderItem.init(
	{
		OrderId: {
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

export default OrderItem;
