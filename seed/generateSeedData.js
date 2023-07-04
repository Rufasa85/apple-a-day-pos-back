import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

const generateSeedData = (numCustomers = 10, numItems = 10, numOrders = 20, numShifts = 5, numItemsPerShift = 4, numItemsPerOrder = 1) => {
	const customers = [];
	const items = [];
	const orders = [];
	const shifts = [];
	const shiftItems = [];
	const orderItems = [];

	// generate customers
	for (let i = 0; i < numCustomers; i++) {
		customers.push({
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			dateOfBirth: faker.date.past({ years: 150 })
		});
	}

	// generate items
	const itemOptions = ['Pizza', 'Burger', 'Chicken Nuggets', 'French Fries', 'Grilled Cheese Sandwich', 'Chicken Tenders', 'Pasta', 'Meatloaf', 'Mashed Potatoes', 'Macaroni and Cheese', 'Salad', 'Soup', 'Hot Dog', 'Tacos', 'Burrito', 'Fried Rice', 'Stir Fry', 'Roast Beef', 'Fish and Chips', 'Sushi', 'Fried Chicken', 'Beef Stew', 'Chili', 'Chicken Fried Rice', 'Lasagna', 'Chicken Parmesan', 'BBQ Ribs', 'Potato Salad', 'Beef Tacos', 'Shrimp Scampi', 'Chicken Caesar Salad', 'Vegetable Stir Fry', "Shepherd's Pie", 'Clam Chowder', 'Garden Salad', 'Chicken Alfredo', 'Teriyaki Chicken', 'Steak', 'Baked Salmon', 'Cornbread', 'Hamburger Steak', 'Fajitas', 'Eggplant Parmesan', 'Lobster Bisque', 'Beef and Broccoli', 'Chicken and Rice', 'Sloppy Joes', 'Baked Ziti', 'Vegetable Soup', 'Baked Chicken', 'Tuna Salad', 'Pork Chops', 'Pad Thai', 'Chicken Quesadilla', 'Egg Fried Rice', 'Goulash', 'Chow Mein', 'Taco Salad', 'Meatball Sub', 'Chicken Noodle Soup', 'Beef and Noodles', 'Chicken Pot Pie', 'Sausage and Peppers', 'Spinach Salad', 'Chicken Stir Fry', 'Tomato Soup', 'Fried Shrimp', 'Biscuits and Gravy', 'Buffalo Wings', 'Beef Burrito', 'Falafel', 'Beef Stir Fry', 'Cobb Salad', 'Chicken and Waffles', 'Hummus Wrap', 'Lentil Soup', 'Beef and Mushroom Pie', 'Ratatouille', 'Fish Tacos', 'Beef Gyro', 'Cajun Chicken Pasta', 'Beef Chili', 'Chicken Shawarma', 'Fish Sandwich', 'Vegetable Curry', 'Tortilla Soup', 'Chicken Fajitas', 'Beef and Bean Burrito', 'Egg Salad Sandwich', 'Chicken Satay', 'Egg Drop Soup', 'Falafel Wrap', 'Beef and Guinness Stew', 'Veggie Burger', 'Chicken Curry', 'Egg Foo Young', 'Tamales', 'Sushi Rolls', 'Lobster Roll', 'Pho'];

	for (let i = 0; i < numItems; i++) {
		const item = itemOptions[i];

		items.push({
			name: item
		});
	}

	// generate orders
	for (let i = 0; i < numOrders; i++) {
		const randomCustomerId = i % 2 === 0 ? null : faker.number.int({ min: 1, max: numCustomers });
		const randomShiftId = faker.number.int({ min: 1, max: numShifts });

		orders.push({
			CustomerId: randomCustomerId,
			ShiftId: randomShiftId
		});
	}

	// generate shifts
	for (let i = 0; i < numShifts; i++) {
		shifts.push({
			date: dayjs().subtract(i, 'day').toDate()
		});
	}

	// utility for shift items and order items
	let unusedItemIds;

	// generate shift items
	for (let i = 0; i < numShifts * numItemsPerShift; i++) {
		if (i % numItemsPerShift === 0) unusedItemIds = [...new Array(numItems).keys()];

		const shiftId = Math.floor(i / numItemsPerShift) + 1;
		const randomItemIdIndex = faker.number.int({ min: 0, max: unusedItemIds.length - 1 });
		const itemId = unusedItemIds.splice(randomItemIdIndex, 1)[0] + 1;

		shiftItems.push({
			ShiftId: shiftId,
			ItemId: itemId
		});
	}

	// generate order items
	for (let i = 0; i < numShifts * numItemsPerOrder; i++) {
		if (i % numItemsPerOrder === 0) unusedItemIds = [...new Array(numItems).keys()];

		const orderId = Math.floor(i / numItemsPerOrder) + 1;
		const randomItemIdIndex = faker.number.int({ min: 0, max: unusedItemIds.length - 1 });
		const itemId = unusedItemIds.splice(randomItemIdIndex, 1)[0] + 1;

		orderItems.push({
			OrderId: orderId,
			ItemId: itemId
		});
	}

	return { customers, items, orders, shifts, shiftItems, orderItems };
};

export default generateSeedData;
