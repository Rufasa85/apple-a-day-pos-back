const getUniqueId = (arr, max) => {
	const id = Math.ceil(Math.random() * max);

	if (arr.indexOf(id) < 0) {
		arr.push(id);
		return id;
	}

	return getUniqueId(arr, max);
};

export default getUniqueId;
