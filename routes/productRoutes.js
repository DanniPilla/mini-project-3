const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.userController.getProducts(res);
});

router.post("/create", (req, res) => {
  Controllers.userController.createProduct(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.userController.updateProduct(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.userController.deleteProduct(req, res);
});

module.exports = router;
