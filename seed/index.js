import sequelize from '../config/connection.js';
import dotenv from 'dotenv';
dotenv.config();

import { Customer, Item, OrderItem, Order, ShiftItem, Shift } from '../models/index.js';

import seedData from './generateData.js';

console.log(seedData);

// const seed = async () => {
// 	try {
// 		await sequelize.sync({ force: true });

// 		await Customer.bulkCreate(customers);
// 		await Item.bulkCreate(items);
// 		await Shift.bulkCreate(shifts);
// 		await Order.bulkCreate(orders);
// 		await OrderItem.bulkCreate(orderItems);
// 		await ShiftItem.bulkCreate(shiftItems);

// 		process.exit(0);
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// seed();
