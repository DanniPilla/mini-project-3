const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.userController.getCategories(res);
});

router.post("/create", (req, res) => {
  Controllers.userController.createCategory(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.userController.updateCategory(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.userController.deleteCategory(req, res);
});

module.exports = router;
