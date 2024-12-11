"use strict";
const Models = require("../models");

const getShipments = (res) => {
  Models.Shipment.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const pendingShipments = (req, res) => {
  Models.Shipment.count({
    where: { status: "Pending" },
  })
    .then((data) => {
      res.send({ result: 200, data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createShipment = (data, res) => {
  Models.Shipment.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateShipment = (req, res) => {
  Models.Shipment.update(req.body, {
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

// if shipment status delivered, it will automatically update order to inactive

const updateShipmentStatus = async (shipmentId, deliveryStatus, res) => {
  try {
    const shipment = await Models.Shipment.findOne({
      where: { id: shipmentId },
    });

    if (!shipment) {
      return res.status(404).send({ result: 404, error: "Shipment not found" });
    }

    shipment.status = deliveryStatus;
    await shipment.save();

    if (deliveryStatus === "delivered") {
      const order = await Models.Order.findOne({
        where: { id: shipment.order_id },
      });
      if (order) {
        order.active = false;
        await order.save();
      }
    }

    res.status(200).send({ result: 200, data: shipment });
  } catch (err) {
    console.error(err);
    res.status(500).send({ result: 500, error: err.message });
  }
};

const deleteShipment = (req, res) => {
  Models.Shipment.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
module.exports = {
  getShipments,
  createShipment,
  updateShipment,
  deleteShipment,
  pendingShipments,
  updateShipmentStatus,
};
