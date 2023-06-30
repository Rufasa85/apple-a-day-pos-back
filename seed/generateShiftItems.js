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

export default generateShiftItems;
