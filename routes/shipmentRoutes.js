const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.shipmentController.getShipments(res);
});

router.get("/pending", (req, res) => {
  Controllers.shipmentController.pendingShipments(req, res);
});

router.post("/create", (req, res) => {
  Controllers.shipmentController.createShipment(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.shipmentController.updateShipment(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.shipmentController.deleteShipment(req, res);
});

module.exports = router;
