const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.userController.getOrderItems(res);
});

router.post("/create", (req, res) => {
  Controllers.userController.createOrderItem(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.userController.updateOrderItem(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.userController.deleteOrderItem(req, res);
});

module.exports = router;
