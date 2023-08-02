import { Customer, Item, Order, OrderItem, Shift, ShiftItem } from '../models/index.js';
import generateSeedData from './generateSeedData.js';

export default async function createSeeds(UserId) {
	try {
		const seeds = generateSeedData(UserId);

		await Shift.bulkCreate(seeds.shifts);
		await Item.bulkCreate(seeds.items);
		await Customer.bulkCreate(seeds.customers);
		await Order.bulkCreate(seeds.orders);
		await ShiftItem.bulkCreate(seeds.shiftItems);
		await OrderItem.bulkCreate(seeds.orderItems);
	} catch (error) {
		console.log(error);
	}
}
