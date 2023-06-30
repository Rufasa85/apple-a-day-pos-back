const generateRandomDate = (from, to) => {
	const difference = new Date(to).getTime() - new Date(from).getTime();
	const randomMidpoint = Math.random() * difference;
	const randomDate = new Date(from).getTime() + randomMidpoint;

	return new Date(randomDate);
};

export default generateRandomDate;
