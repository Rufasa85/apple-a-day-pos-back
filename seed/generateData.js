import { getRandomDate } from './utils/index.js';

const generateShifts = (quantity) => {
	const shifts = [];

	for (let i = 0; i < quantity; i++) {
		const randomHoliday = Math.floor(Math.random() * 7) === 0;

		if (randomHoliday) {
			quantity++;
		} else {
			shifts.push({
				date: new Date(new Date().setDate(new Date().getDate() - i))
			});
		}
	}

	return shifts;
};

const generateItems = (quantity) => {
	const items = ['Pizza', 'Burger', 'Chicken Nuggets', 'French Fries', 'Grilled Cheese Sandwich', 'Chicken Tenders', 'Pasta', 'Meatloaf', 'Mashed Potatoes', 'Macaroni and Cheese', 'Salad', 'Soup', 'Hot Dog', 'Tacos', 'Burrito', 'Fried Rice', 'Stir Fry', 'Roast Beef', 'Fish and Chips', 'Sushi', 'Fried Chicken', 'Beef Stew', 'Chili', 'Chicken Fried Rice', 'Lasagna', 'Chicken Parmesan', 'BBQ Ribs', 'Potato Salad', 'Beef Tacos', 'Shrimp Scampi', 'Chicken Caesar Salad', 'Vegetable Stir Fry', "Shepherd's Pie", 'Clam Chowder', 'Garden Salad', 'Chicken Alfredo', 'Teriyaki Chicken', 'Steak', 'Baked Salmon', 'Cornbread', 'Hamburger Steak', 'Fajitas', 'Eggplant Parmesan', 'Lobster Bisque', 'Beef and Broccoli', 'Chicken and Rice', 'Sloppy Joes', 'Baked Ziti', 'Vegetable Soup', 'Baked Chicken', 'Tuna Salad', 'Pork Chops', 'Pad Thai', 'Chicken Quesadilla', 'Egg Fried Rice', 'Goulash', 'Chow Mein', 'Taco Salad', 'Meatball Sub', 'Chicken Noodle Soup', 'Beef and Noodles', 'Chicken Pot Pie', 'Sausage and Peppers', 'Spinach Salad', 'Chicken Stir Fry', 'Tomato Soup', 'Fried Shrimp', 'Biscuits and Gravy', 'Buffalo Wings', 'Beef Burrito', 'Falafel', 'Beef Stir Fry', 'Cobb Salad', 'Chicken and Waffles', 'Hummus Wrap', 'Lentil Soup', 'Beef and Mushroom Pie', 'Ratatouille', 'Fish Tacos', 'Beef Gyro', 'Cajun Chicken Pasta', 'Beef Chili', 'Chicken Shawarma', 'Fish Sandwich', 'Vegetable Curry', 'Tortilla Soup', 'Chicken Fajitas', 'Beef and Bean Burrito', 'Egg Salad Sandwich', 'Chicken Satay', 'Egg Drop Soup', 'Falafel Wrap', 'Beef and Guinness Stew', 'Veggie Burger', 'Chicken Curry', 'Egg Foo Young', 'Tamales', 'Sushi Rolls', 'Lobster Roll', 'Pho'];
	items.splice(quantity);

	return items;
};

const generateCustomers = (quantity) => {
	const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn', 'Abigail', 'Emily', 'Elizabeth', 'Mila', 'Ella', 'Avery', 'Sofia', 'Camila', 'Aria', 'Scarlett', 'Victoria', 'Madison', 'Luna', 'Grace', 'Chloe', 'Penelope', 'Layla', 'Riley', 'Zoey', 'Nora', 'Lily', 'Eleanor', 'Hannah', 'Lillian', 'Addison', 'Aubrey', 'Ellie', 'Stella', 'Natalie', 'Zoe', 'Leah', 'Hazel', 'Violet', 'Aurora', 'Savannah', 'Audrey', 'Brooklyn', 'Bella', 'Claire', 'Skylar', 'Lucy', 'Paisley', 'Everly', 'Anna', 'Caroline', 'Nova', 'Genesis', 'Emilia', 'Kennedy', 'Samantha', 'Maya', 'Willow', 'Kinsley', 'Naomi', 'Aaliyah', 'Elena', 'Sarah', 'Ariana', 'Allison', 'Gabriella', 'Alice', 'Madelyn', 'Cora', 'Ruby', 'Eva', 'Serenity', 'Autumn', 'Adeline', 'Hailey', 'Gianna', 'Valentina', 'Isla', 'Eliana', 'Quinn', 'Nevaeh', 'Ivy', 'Sadie', 'Piper', 'Lydia', 'Alexa', 'Josephine', 'Emery', 'Julia', 'Delilah', 'Arianna', 'Vivian', 'Kaylee', 'Sophie'];
	const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez', 'James', 'Watson', 'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler', 'Simmons', 'Foster', 'Gonzales', 'Reyes', 'Russell', 'Griffin', 'Diaz', 'Hayes', 'Myers'];

	const customers = [];

	for (let i = 0; i < quantity; i++) {
		customers.push({
			firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
			lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
			dateOfBirth: getRandomDate('01/01/1900', new Date())
		});
	}

	return customers;
};

const generateOrders = (quantity) => {
	const orders = [];

	for (let i = 0; i < quantity * 5; i++) {
		orders.push({
			CustomerId: Math.floor(Math.random() * quantity) + 1,
			ShiftId: Math.floor(Math.random() * quantity) + 1
		});
	}

	return orders;
};

const generateShiftItems = (quantity) => {
	const items = [];

	for (let i = 0; i < 4; i++) {
		items.push({
			ShiftId: Math.floor(Math.random() * quantity),
			ItemId: Math.floor(Math.random() * quantity)
		});
	}

	return items;
};

const generateOrderItems = (quantity) => {
	const items = [];

	for (let i = 0; i < quantity * 15; i++) {
		items.push({
			OrderId: Math.floor(Math.random() * quantity),
			ItemId: Math.floor(Math.random() * quantity),
			OrderCustomerId: Math.floor(Math.random() * quantity)
		});
	}

	return items;
};

const quantity = 30;

const seedData = {
	shifts: generateShifts(quantity),
	items: generateItems(quantity),
	customers: generateCustomers(quantity),
	orders: generateOrders(quantity),
	shiftItems: generateShiftItems(quantity),
	orderItems: generateOrderItems(quantity)
};

export default seedData;
