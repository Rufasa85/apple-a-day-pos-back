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

		fullName: {
			type: DataTypes.VIRTUAL,
			get() {
				return `${this.firstName} ${this.lastName}`;
			}
		},

		dateOfBirth: {
			type: DataTypes.DATE,
			allowNull: false
		}
	},
	{
		sequelize
	}
);

export default Customer;
