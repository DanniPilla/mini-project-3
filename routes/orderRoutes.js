const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.orderController.getOrders(res);
});

router.post("/create", (req, res) => {
  Controllers.orderController.createOrder(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.orderController.updateOrder(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.orderController.deleteOrder(req, res);
});

module.exports = router;
