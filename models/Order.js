import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class Order extends Model {}

Order.init(
	{
		CustomerId: {
			type: DataTypes.INTEGER,
			allowNull: true
		},

		ShiftId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize
	}
);

export default Order;
