import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class OrderItem extends Model {}

OrderItem.init(
	{
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false
    // },
		// OrderId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	unique: false,

		// },
		// ItemId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	unique: false
		// },
    // omit quantity
		// quantity: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	defaultValue: 1
		// }
	},
	{
		sequelize,
    timestamps: false
	}
);

export default OrderItem;
