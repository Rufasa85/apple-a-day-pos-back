import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/connection.js';

// create our User model
class User extends Model {}

User.init(
	{
		email: {
			type: DataTypes.STRING,
			allowsNull: false,
			unique: true
		},

		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4]
			}
		}
	},
	{
		hooks: {
			// set up beforeCreate lifecycle "hook" functionality
			beforeCreate: async (newUserData) => {
				newUserData.password = await bcrypt.hash(newUserData.password, 5);
				return newUserData;
			},

			beforeUpdate: async (updatedUserData) => {
				updatedUserData.password = await bcrypt.hash(updatedUserData.password, 5);
				return updatedUserData;
			}
		},

		sequelize
	}
);

export default User;
