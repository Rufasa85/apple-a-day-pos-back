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

export default generateOrderItems;
