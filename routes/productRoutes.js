const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.productController.getProducts(res);
});

router.get("/quantity/:name", (req, res) => {
  Controllers.productController.productQuantity(req, res);
});

router.get("/ordercount/:id", (req, res) => {
  Controllers.productController.getProductOrderCount(req, res);
});

router.post("/create", (req, res) => {
  Controllers.productController.createProduct(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.productController.updateProduct(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.productController.deleteProduct(req, res);
});

module.exports = router;
