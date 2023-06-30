import { generateRandomDate, generateRandomName } from './utils/index.js';

const generateCustomers = (quantity) => {
	const customers = [];

	for (let i = 0; i < quantity; i++) {
		customers.push({
			firstName: generateRandomName('first'),
			lastName: generateRandomName('last'),
			dateOfBirth: generateRandomDate('01/01/1900', new Date())
		});
	}

	return customers;
};

export default generateCustomers;
