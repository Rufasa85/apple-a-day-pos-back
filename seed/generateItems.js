import { getRandomName } from './utils/index.js';

const generateItems = (quantity) => {
	const items = [];

	for (let i = 0; i < quantity; i++) {
		items.push({
			name: getRandomName('food')
		});
	}

	return items;
};

export default generateItems;
