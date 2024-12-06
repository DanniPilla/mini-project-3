"use strict";
const Models = require("../models");
// finds all users in DB, then sends array as response
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
// uses JSON from request body to create new user in DB
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
// deletes user matching ID from params
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
};
