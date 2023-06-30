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

export default generateOrders;

// const generateOrders = (quantity) => {
// 	const orders = {
// 		orders: [],
// 		orderItems: []
// 	};

// 	for (let i = 0; i < quantity * 5; i++) {
// 		const customerId = Math.floor(Math.random() * quantity) + 2001;
// 		const shiftId = Math.floor(Math.random() * quantity) + 1;

// 		orders.orders.push({
// 			CustomerId: customerId,
// 			ShiftId: shiftId
// 		});

// 		orders.orderItems.push({
// 			OrderId: i + 3001,
// 			ItemId: Math.floor(Math.random() * quantity) + 1001,
// 			OrderCustomerId: Math.floor(Math.random() * quantity) + 5001
// 		});
// 	}

// 	return orders;
// };

// export default generateOrders;
