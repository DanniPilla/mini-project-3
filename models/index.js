"use strict";
const User = require("./user");
const Order = require("./order");
const OrderItem = require("./order_item");
const Product = require("./product");
const Category = require("./category");
const Shipment = require("./shipment");

User.hasMany(Order, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Order.hasMany(Shipment, {
  foreignKey: "order_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Shipment.belongsTo(Order, { foreignKey: "order_id" });

Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

async function init() {
  await User.sync(); // sync the model
  await Order.sync();
  await Category.sync();
  await Product.sync();
  await OrderItem.sync();
  await Shipment.sync();
  // also sync any extra models here
}

init();

module.exports = {
  User,
  Order,
  OrderItem,
  Product,
  Category,
  Shipment, // export the model
  // also export any extra models here
};
