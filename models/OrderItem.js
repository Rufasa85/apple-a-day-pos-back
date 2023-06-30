import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class OrderItem extends Model {}

OrderItem.init(
	{},
	{
		sequelize
	}
);

export default OrderItem;
