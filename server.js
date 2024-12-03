const express = require("express");
const app = express();
require("dotenv").config();

let dbConnect = require("./lib/dbConnect");
let userRoutes = require("./routes/userRoutes");
let productRoutes = require("./routes/productRoutes");
let categoryRoutes = require("./routes/categoryRoutes");
let orderRoutes = require("./routes/orderRoutes");
let orderItemRoutes = require("./routes/orderItemRoutes");
let shipmentRoutes = require("./routes/shipmentRoutes");

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api/shipments", shipmentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my mySQL application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port
${PORT}.`);
});
