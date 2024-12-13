"use strict";
const Models = require("../models");

const getCategories = (req, res) => {
  Models.Category.findAll({})
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

// find all products under a specific category

const productsByCategory = (req, res) => {
  Models.Category.findAll({
    where: { name: req.params.name },
    include: Models.Product,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createCategory = (data, res) => {
  Models.Category.create(data)
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateCategory = (req, res) => {
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

const deleteCategory = async (req, res) => {
  try {
    const category = await Models.Category.findOne({
      where: { id: req.params.id },
    });
    if (!category) {
      return res.status(404).send({ result: 404, error: "category not found" });
    }
    const productCount = await Models.Product.count({
      where: { category_id: req.params.id },
    });

    if (productCount > 0) {
      return res.status(400).send({
        result: 400,
        error: "category cannot be deleted as product associated",
      });
    }
    await Models.Category.destroy({ where: { id: req.params.id } });
    res.send({ result: 200, message: "Category deleted" });
  } catch (err) {
    console.log(err);
    res.send({ result: 500, error: err.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  productsByCategory,
};
