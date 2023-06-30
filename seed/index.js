import sequelize from '../config/connection.js';
import dotenv from 'dotenv';
dotenv.config();

import { Customer, Item, OrderItem, Order, ShiftItem, Shift } from '../models/index.js';
import getSeeds from './getSeeds.js';

// accepts one argument - number of shifts
const seeds = getSeeds(10);

const seed = async () => {
	try {
		await sequelize.sync({ force: true });

		await Shift.bulkCreate(seeds.shifts);
		await Item.bulkCreate(seeds.items);
		await Customer.bulkCreate(seeds.customers);
		await Order.bulkCreate(seeds.orders);
		await ShiftItem.bulkCreate(seeds.shiftItems);
		await OrderItem.bulkCreate(seeds.orderItems);

		process.exit(0);
	} catch (error) {
		console.error(error);
	}
};

seed();
