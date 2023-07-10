import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class Shift extends Model {}

Shift.init(
	{
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			defaultValue: DataTypes.NOW
		}
	},
	{
		sequelize
	}
);

export default Shift;
