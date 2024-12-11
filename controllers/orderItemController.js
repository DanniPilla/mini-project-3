"use strict";
const sequelize = require("../lib/dbConnect");
const Models = require("../models");

const getOrderItems = (res) => {
  Models.OrderItem.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// Transaction made so that when creating an order, product stock quantity will be updated
// and checked before placing order that stock is available.

const createOrderItem = async (data, res) => {
  const { productId, quantity, orderId, price } = data;
  const transaction = await sequelize.transaction();
  try {
    const item = await Models.Product.findOne({
      where: { id: productId },
      lock: true,
      transaction,
    });

    if (!item) {
      return res.send({ result: 404, error: "Product not found" });
    }

    if (item.stock_quantity < quantity) {
      return res.send({
        result: 400,
        error: "Insufficient stock for this product",
      });
    }
    const orderItem = await Models.OrderItem.create(
      { product_id: productId, quantity, order_id: orderId, price },
      { transaction }
    );
    item.stock_quantity -= quantity;
    await item.save({ transaction });
    await transaction.commit();

    res.send({ result: 200, data: orderItem });
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    res.send({ result: 500, error: err.message });
  }
};

const updateOrderItem = (req, res) => {
  Models.OrderItem.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteOrderItem = (req, res) => {
  Models.OrderItem.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
module.exports = {
  getOrderItems,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
