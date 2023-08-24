import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class Customer extends Model {}

Customer.init(
	{
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},

		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},

		dateOfBirth: {
			type: DataTypes.DATEONLY,
			allowNull: true
		}
	},
	{
		sequelize
	}
);

export default Customer;
