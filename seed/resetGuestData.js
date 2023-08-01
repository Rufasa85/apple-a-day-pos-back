import { Customer, Item, Shift } from '../models/index.js';
import createSeeds from './createSeeds.js';

export default async function resetGuestData(UserId) {
	try {
		const options = {
			where: { UserId }
		};

		const shifts = await Shift.destroy(options);
		const customers = await Customer.destroy(options);
		const items = await Item.destroy(options);

		console.log(shifts, customers, items);

		await createSeeds(UserId);
	} catch (error) {
		console.log(error);
	}
}
