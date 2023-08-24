import sequelize from '../config/connection.js';
import dotenv from 'dotenv';
dotenv.config();

import { Customer, Item, OrderItem, Order, ShiftItem, Shift, User } from '../models/index.js';
import createSeeds from './createSeeds.js';

const users = [
	{ username: 'admin', password: process.env.ADMIN_PASSWORD },
	{ username: 'guest', password: process.env.GUEST_PASSWORD }
];

const seed = async () => {
	try {
		await sequelize.sync({ force: true });

		await User.bulkCreate(users, {
			individualHooks: true
		});

		// for (let i = 1; i <= users.length; i++) {
		// 	// await createSeeds(i);
		// }

		process.exit(0);
	} catch (error) {
		console.log(error);
	}
};

seed();
