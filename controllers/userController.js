"use strict";
const Models = require("../models");

const getUsers = (res) => {
  Models.User.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createUser = (data, res) => {
  Models.User.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateUser = (req, res) => {
  Models.User.update(req.body, {
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

const deleteUser = async (req, res) => {
  try {
    const user = await Models.User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).send({ result: 404, error: "user not found" });
    }

    const order = await Models.Order.findOne({
      where: { user_id: req.params.id },
    });
    if (order && order.active === true) {
      return res.status(400).send({
        result: 400,
        error: "User cannot be deleted with an active order in place",
      });
    }
    await Models.User.destroy({ where: { id: req.params.id } });
    res.send({ result: 200, message: "user deleted" });
  } catch (err) {
    console.log(err);
    res.send({ result: 500, error: err.message });
  }
};
module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
