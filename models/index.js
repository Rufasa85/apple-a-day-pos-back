import Customer from './Customer.js';
import Item from './Item.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Shift from './Shift.js';
import ShiftItem from './ShiftItem.js';

Customer.hasMany(Order);
Order.belongsTo(Customer);

Shift.hasMany(Order);
Order.belongsTo(Shift);

Order.belongsToMany(Item, { through: OrderItem });
Item.belongsToMany(Order, { through: OrderItem });

Shift.belongsToMany(Item, { through: ShiftItem });
Item.belongsToMany(Shift, { through: ShiftItem });

export { Customer, Item, Order, OrderItem, Shift, ShiftItem };
