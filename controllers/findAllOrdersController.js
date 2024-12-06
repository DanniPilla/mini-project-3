"use strict";
const Models = require("../models");

const findAllOrders = (req, res) => {
  Models.User.findAll({
    where: { id: req.params.id },
    include: Models.Order,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  findAllOrders,
};
