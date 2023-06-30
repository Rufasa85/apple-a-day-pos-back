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

export default generateShifts;
