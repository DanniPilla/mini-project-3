"use strict";
const Models = require("../models");

const getOrders = (res) => {
  Models.Order.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createOrder = (data, res) => {
  Models.Order.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateOrder = (req, res) => {
  Models.Order.update(req.body, {
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

// Constraints in place so an order cannot be deleted if it has been shipped or delivered

const deleteOrder = async (req, res) => {
  try {
    const order = await Models.Order.findOne({ where: { id: req.params.id } });
    if (!order) {
      return res.status(404).send({ result: 404, error: "Order not found" });
    }
    const shipment = await Models.Shipment.findOne({
      where: { order_id: req.params.id },
    });

    if (
      shipment &&
      (shipment.status === "In Transit" || shipment.status === "delivered")
    ) {
      return res.status(400).send({
        result: 400,
        error: "Order cannot be deleted as shipment is sent or delivered",
      });
    }
    await Models.Order.destroy({ where: { id: req.params.id } });
    res.send({ result: 200, message: "Order deleted" });
  } catch (err) {
    console.log(err);
    res.send({ result: 500, error: err.message });
  }
};
module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
