const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.orderItemController.getOrderItems(res);
});

router.post("/create", (req, res) => {
  Controllers.orderItemController.createOrderItem(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.orderItemController.updateOrderItem(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.orderItemController.deleteOrderItem(req, res);
});

module.exports = router;
