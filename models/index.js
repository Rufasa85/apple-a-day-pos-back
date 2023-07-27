import Customer from './Customer.js';
import Item from './Item.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Shift from './Shift.js';
import ShiftItem from './ShiftItem.js';
import User from './User.js';

Customer.hasMany(Order);
Order.belongsTo(Customer);

Shift.hasMany(Order);
Order.belongsTo(Shift);

User.hasMany(Shift)
Shift.belongsTo(User)

User.hasMany(Customer)
Customer.belongsTo(User)

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Item.hasMany(OrderItem);
OrderItem.belongsTo(Item);

Shift.belongsToMany(Item, { through: ShiftItem });
Item.belongsToMany(Shift, { through: ShiftItem });

export { Customer, Item, Order, OrderItem, Shift, ShiftItem, User };
