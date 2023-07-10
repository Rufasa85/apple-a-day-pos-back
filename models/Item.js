import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class Item extends Model {}

Item.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize
	}
);

export default Item;
