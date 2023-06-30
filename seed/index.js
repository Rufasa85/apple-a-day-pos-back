import sequelize from '../config/connection.js';
import dotenv from 'dotenv';
dotenv.config();

import { Customer, Item, OrderItem, Order, ShiftItem, Shift } from '../models/index.js';

import generateCustomers from './generateCustomers.js';
import generateItems from './generateItems.js';
import generateOrderItems from './generateOrderItems.js';
import generateOrders from './generateOrders.js';
import generateShiftItems from './generateShiftItems.js';
import generateShifts from './generateShifts.js';

import { generateRandomName, generateRandomDate } from './utils/index.js';

// 0 - 100
const quantity = 30;

const customers = generateCustomers(quantity);
const items = generateItems(quantity);
// const orderItems = generateOrderItems(quantity);
// const orders = generateOrders(quantity);
// const shiftItems = generateShiftItems(quantity);
const shifts = generateShifts(quantity);

const orders = [
	{
		CustomerId: 1,
		ShiftId: 1
	},
	{
		CustomerId: 2,
		ShiftId: 1
	},
	{
		CustomerId: 3,
		ShiftId: 1
	},
	{
		CustomerId: 4,
		ShiftId: 2
	},
	{
		CustomerId: 5,
		ShiftId: 2
	}
];

const orderItems = [
	{
		OrderId: 1,
		ItemId: 1,
		OrderCustomerId: 1
	},
	{
		OrderId: 1,
		ItemId: 3,
		OrderCustomerId: 1
	},
	{
		OrderId: 2,
		ItemId: 2,
		OrderCustomerId: 2
	},
	{
		OrderId: 2,
		ItemId: 4,
		OrderCustomerId: 2
	},
	{
		OrderId: 3,
		ItemId: 1,
		OrderCustomerId: 3
	}
];

const shiftItems = [
	{
		ShiftId: 1,
		ItemId: 1
	},
	{
		ShiftId: 1,
		ItemId: 12
	},
	{
		ShiftId: 1,
		ItemId: 2
	},
	{
		ShiftId: 1,
		ItemId: 4
	},
	{
		ShiftId: 2,
		ItemId: 1
	},
	{
		ShiftId: 2,
		ItemId: 14
	},
	{
		ShiftId: 2,
		ItemId: 8
	},
	{
		ShiftId: 2,
		ItemId: 26
	},
	{
		ShiftId: 3,
		ItemId: 1
	},
	{
		ShiftId: 3,
		ItemId: 12
	},
	{
		ShiftId: 3,
		ItemId: 2
	},
	{
		ShiftId: 3,
		ItemId: 4
	},
	{
		ShiftId: 4,
		ItemId: 1
	},
	{
		ShiftId: 4,
		ItemId: 14
	},
	{
		ShiftId: 4,
		ItemId: 8
	},
	{
		ShiftId: 4,
		ItemId: 26
	}
];

const seed = async () => {
	try {
		await sequelize.sync({ force: true });

		await Customer.bulkCreate(customers);
		await Item.bulkCreate(items);
		await Shift.bulkCreate(shifts);
		await Order.bulkCreate(orders);
		await OrderItem.bulkCreate(orderItems);
		await ShiftItem.bulkCreate(shiftItems);

		process.exit(0);
	} catch (error) {
		console.error(error);
	}
};

seed();
