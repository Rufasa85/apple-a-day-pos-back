import sequelize from '../config/connection.js';

import { Customer, Item, OrderItem, Order, ShiftItem, Shift, User } from '../models/index.js';
import generateSeedData from './generateSeedData.js';

const users = [
	{ email: 'apple@day.com', password: 'manatee' },
	{ email: 'henryweigand10@gmail.com', password: 'turtle' },
	{ email: 'eraiskinwood@instructors.2u.com', password: 'dolphin' }
];

// optional arguments: (numCustomers, numItems, numOrders, numShifts, numItemsPerShift, numItemsPerOrder)

const seed = async () => {
	try {
		await sequelize.sync({ force: true });

		await User.bulkCreate(users, {
			individualHooks: true
		});

		for (let i = 1; i <= users.length; i++) {
			const seeds = generateSeedData(i);

			await Shift.bulkCreate(
				seeds.shifts.map((shift) => {
					return { ...shift, UserId: i };
				})
			);

			await Item.bulkCreate(seeds.items);

			await Customer.bulkCreate(
				seeds.customers.map((customer) => {
					return { ...customer, UserId: i };
				})
			);

			await Order.bulkCreate(seeds.orders);
			await ShiftItem.bulkCreate(seeds.shiftItems);
			await OrderItem.bulkCreate(seeds.orderItems);
		}

		process.exit(0);
	} catch (error) {
		console.log(error);
	}
};

seed();
