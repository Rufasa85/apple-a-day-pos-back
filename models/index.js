import Customer from './Customer.js';
import Item from './Item.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Shift from './Shift.js';
import ShiftItem from './ShiftItem.js';
import User from './User.js';

User.hasMany(Shift);
Shift.belongsTo(User);

User.hasMany(Customer);
Customer.belongsTo(User);

User.hasMany(Item);
Item.belongsTo(User);

Shift.hasMany(Order);
Order.belongsTo(Shift);

Customer.hasMany(Order);
Order.belongsTo(Customer);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Item.hasMany(OrderItem);
OrderItem.belongsTo(Item);

Shift.hasMany(ShiftItem);
ShiftItem.belongsTo(Shift);

Item.hasMany(ShiftItem);
ShiftItem.belongsTo(Item);

// Shift.belongsToMany(Item, { through: ShiftItem });
// Item.belongsToMany(Shift, { through: ShiftItem });

export { Customer, Item, Order, OrderItem, Shift, ShiftItem, User };
