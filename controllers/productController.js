"use strict";
const Models = require("../models");

const getProducts = (res) => {
  Models.Product.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// find stock amount of particular products

const productQuantity = (req, res) => {
  Models.Product.findOne({
    where: { name: req.params.name },
    attributes: ["name", "stock_quantity"],
  })
    .then((data) => {
      res.send({ result: 200, data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// find how much each product has been ordered

const getProductOrderCount = async (req, res) => {
  try {
    const productId = req.params.id;
    const orderCount = await Models.OrderItem.count({
      where: { product_id: productId },
    });
    console.log("Product ID:", productId);
    res.send({
      result: 200,
      productId: productId,
      orderCount: orderCount,
    });
    console.log("Order Count Query Result:", orderCount);
  } catch (err) {
    res.status({
      result: 500,
      error: err.message,
    });
  }
};

const createProduct = (data, res) => {
  Models.Product.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateProduct = (req, res) => {
  Models.Product.update(req.body, {
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

const deleteProduct = (req, res) => {
  Models.Product.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};
module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  productQuantity,
  getProductOrderCount,
};
