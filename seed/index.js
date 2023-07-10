import sequelize from '../config/connection.js';

import { Customer, Item, OrderItem, Order, ShiftItem, Shift } from '../models/index.js';
import generateSeedData from './generateSeedData.js';

// optional arguments: (numCustomers, numItems, numOrders, numShifts, numItemsPerShift, numItemsPerOrder)
const seeds = generateSeedData();

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
