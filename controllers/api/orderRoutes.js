import express from "express";
import dotenv from "dotenv";
dotenv.config();

// import all models to easily manipulate includes
// remove unused models before deployment
import { Customer, Order, Shift, Item, OrderItem } from "../../models/index.js";
import apiAuth from "../../middleware/apiAuth.js";

const router = express.Router();

// GET all orders
router.get("/", apiAuth, async (req, res) => {
  try {
    const options = {
      // include: { all: true, nested: true }
      include: { all: true },
    };

    const orders = await Order.findAll(options);
    if (!orders.length)
      return res.status(404).json({ error: "There are no orders." });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// GET one order
router.get("/:id", apiAuth, async (req, res) => {
  try {
    const options = {
      // include: { all: true, nested: true }
      include: [
        {
          model: OrderItem,
          include: { model: Item },
        },
      ],
    };

    const order = await Order.findByPk(req.params.id, options);
    if (!order)
      return res.status(404).json({ error: "This order could not be found." });

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// POST new order
// req.body format:
// {
//   "CustomerId": 12,
//   "ShiftId": 10,
//   "ItemIds": [2,2,3,7]
// }
router.post("/", apiAuth, async (req, res) => {
  try {
    const order = await Order.create(req.body);
    if (!order)
      return res
        .status(400)
        .json({ error: "This order could not be created." });
    if (req.body.ItemIds.length > 0) {
      const orderitems = req.body.ItemIds.map((itemId) => {
        return {
          OrderId: order.id,
          ItemId: itemId,
        };
      });
      OrderItem.bulkCreate(orderitems);
    }
    // if array is empty prob throw an error? tell user they must select at least one item ?

    return res.status(200).json({ message: "order created!", order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

// PUT update order
router.put("/:id", apiAuth, async (req, res) => {
  try {
    const options = {
      where: { id: req.params.id },
    };

    const order = await Order.update(req.body, options);
    if (!order)
      return res.status(404).json({ error: "This order could not be found." });

    return res.status(200).json({ message: "order updated!", order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

// DELETE order
router.delete("/:id", apiAuth, async (req, res) => {
  try {
    const options = {
      where: { id: req.params.id },
    };

    const order = await Order.destroy(options);
    if (!order)
      return res.status(404).json({ error: "This order could not be found." });

    return res.status(200).json({ message: "order deleted!", order });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
