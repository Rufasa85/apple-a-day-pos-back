import { getRandomDate, getRandomName } from './utils/index.js';

const generateCustomers = (quantity) => {
	const customers = [];

	for (let i = 0; i < quantity; i++) {
		customers.push({
			firstName: getRandomName('first'),
			lastName: getRandomName('last'),
			dateOfBirth: getRandomDate('01/01/1900', new Date())
		});
	}

	return customers;
};

export default generateCustomers;
