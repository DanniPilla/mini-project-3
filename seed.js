let dbConnect = require("./lib/dbConnect");
let Shipment = require("./models/shipment");
let Category = require("./models/category");
let Product = require("./models/product");
let Order = require("./models/order");
let OrderItem = require("./models/order_item");
let User = require("./models/user");

async function seed() {
  const transaction = await dbConnect.transaction();

  try {
    const users = [
      {
        firstName: "Danni",
        lastName: "Pilla",
        email: "email@.com",
        password: "123",
        address: "Tokyo Dome",
        phone: "1234556",
      },
      {
        firstName: "Alphonse",
        lastName: "Pilla",
        email: "email12@.com",
        password: "12345",
        address: "London",
        phone: "12345567",
      },
    ];
    const userInstances = await User.bulkCreate(users, {
      validate: true,
      transaction,
    });
    console.log("Users seeded");

    const categories = [
      {
        name: "Tops",
        description: "Varying upper body apparel",
      },
      {
        name: "Dresses",
        description: "Varying styles of a one-piece garment",
      },
    ];
    const categoryInstances = await Category.bulkCreate(categories, {
      validate: true,
      transaction,
    });
    console.log("Categories seeded");

    const products = [
      {
        name: "Gigi shirt",
        description: "Shirt with a bow",
        price: 50,
        stock_quantity: 200,
        category_id: categoryInstances[0].id,
      },
      {
        name: "Layla dress",
        description: "full length dress with embroidered flowers",
        price: 150,
        stock_quantity: 200,
        category_id: categoryInstances[1].id,
      },
    ];
    const productInstances = await Product.bulkCreate(products, {
      validate: true,
      transaction,
    });
    console.log("products seeded");

    const orders = [
      {
        user_id: userInstances[0].id,
        order_date: new Date(),
        total_amount: 200,
      },
      {
        user_id: userInstances[1].id,
        order_date: new Date(),
        total_amount: 200,
      },
    ];
    const orderInstances = await Order.bulkCreate(orders, {
      validate: true,
      transaction,
    });
    console.log("orders seeded");

    const orderItems = [
      {
        order_id: orderInstances[0].id,
        product_id: productInstances[0].id,
        quantity: 1,
        price: productInstances[0].price,
      },
      {
        order_id: orderInstances[1].id,
        product_id: productInstances[1].id,
        quantity: 1,
        price: productInstances[1].price,
      },
    ];
    await OrderItem.bulkCreate(orderItems, { validate: true, transaction });
    console.log("order items seeded");

    const shipments = [
      {
        order_id: orderInstances[0].id,
        shipment_date: new Date("2024-12-01"),
        email: "noduplicatesgirl@.com",
        address: "Tokyo Dome",
        carrier: "AusPost",
        tracking_number: "track123",
        delivery_date: new Date("2024-12-01"),
      },
      {
        order_id: orderInstances[1].id,
        shipment_date: new Date("2024-12-02"),
        email: "uniqueemails@.com",
        address: "Osaka Castle",
        carrier: "FedEx",
        tracking_number: "track456",
        status: "In Transit",
        delivery_date: null,
      },
    ];
    await Shipment.bulkCreate(shipments, { validate: true, transaction });
    console.log("shipments seeded");

    await transaction.commit();
    console.log("Dummy data seeded successfully");
  } catch (error) {
    await transaction.rollback();
    console.error("Error seeding data:", error);
  } finally {
    await dbConnect.close();
  }
}
seed();
