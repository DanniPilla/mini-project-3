const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.userController.getOrders(res);
});

router.post("/create", (req, res) => {
  Controllers.userController.createOrder(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.userController.updateOrder(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.userController.deleteOrder(req, res);
});

module.exports = router;
