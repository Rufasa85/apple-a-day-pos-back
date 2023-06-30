import { generateRandomName } from './utils/index.js';

const generateItems = (quantity) => {
	const items = [];

	for (let i = 0; i < quantity; i++) {
		items.push({
			name: generateRandomName('food')
		});
	}

	return items;
};

export default generateItems;
