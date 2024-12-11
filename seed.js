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
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        password: "password1",
        address: "123 Maple Street",
        phone: "1234567890",
      },
      {
        firstName: "Bob",
        lastName: "Smith",
        email: "bob.smith@example.com",
        password: "password2",
        address: "456 Oak Avenue",
        phone: "0987654321",
      },
      {
        firstName: "Charlie",
        lastName: "Brown",
        email: "charlie.brown@example.com",
        password: "password3",
        address: "789 Pine Lane",
        phone: "1122334455",
      },
      {
        firstName: "Daisy",
        lastName: "Taylor",
        email: "daisy.taylor@example.com",
        password: "password4",
        address: "135 Elm Street",
        phone: "5566778899",
      },
      {
        firstName: "Evan",
        lastName: "Williams",
        email: "evan.williams@example.com",
        password: "password5",
        address: "246 Cedar Road",
        phone: "6677889900",
      },
    ];
    const userInstances = await User.bulkCreate(users, {
      validate: true,
      transaction,
    });
    console.log("Users seeded");

    const categories = [
      {
        name: "Shoes",
        description: "Footwear for all occasions",
      },
      {
        name: "Accessories",
        description: "Bags, jewelry, and other fashion items",
      },
    ];
    const categoryInstances = await Category.bulkCreate(categories, {
      validate: true,
      transaction,
    });
    console.log("Categories seeded");

    const products = [
      {
        name: "Classic Sneakers",
        description: "Comfortable white sneakers",
        price: 75,
        stock_quantity: 150,
        category_id: categoryInstances[0].id,
      },
      {
        name: "Leather Handbag",
        description: "Elegant black leather handbag",
        price: 120,
        stock_quantity: 100,
        category_id: categoryInstances[1].id,
      },
      {
        name: "Gold Earrings",
        description: "Simple and stylish gold earrings",
        price: 50,
        stock_quantity: 50,
        category_id: categoryInstances[1].id,
      },
      {
        name: "Running Shoes",
        description: "Lightweight shoes for running",
        price: 90,
        stock_quantity: 200,
        category_id: categoryInstances[0].id,
      },
      {
        name: "Travel Backpack",
        description: "Spacious and durable backpack",
        price: 85,
        stock_quantity: 75,
        category_id: categoryInstances[1].id,
      },
    ];
    const productInstances = await Product.bulkCreate(products, {
      validate: true,
      transaction,
    });
    console.log("Products seeded");

    const orders = [
      {
        user_id: userInstances[0].id,
        order_date: new Date(),
        total_amount: 145,
      },
      {
        user_id: userInstances[1].id,
        order_date: new Date(),
        total_amount: 75,
      },
      {
        user_id: userInstances[2].id,
        order_date: new Date(),
        total_amount: 120,
      },
      {
        user_id: userInstances[3].id,
        order_date: new Date(),
        total_amount: 90,
      },
      {
        user_id: userInstances[4].id,
        order_date: new Date(),
        total_amount: 50,
      },
    ];
    const orderInstances = await Order.bulkCreate(orders, {
      validate: true,
      transaction,
    });
    console.log("Orders seeded");

    const orderItems = [
      {
        order_id: orderInstances[0].id,
        product_id: productInstances[0].id,
        quantity: 2,
        price: productInstances[0].price * 2,
      },
      {
        order_id: orderInstances[1].id,
        product_id: productInstances[1].id,
        quantity: 1,
        price: productInstances[1].price,
      },
      {
        order_id: orderInstances[2].id,
        product_id: productInstances[2].id,
        quantity: 3,
        price: productInstances[2].price * 3,
      },
      {
        order_id: orderInstances[3].id,
        product_id: productInstances[3].id,
        quantity: 1,
        price: productInstances[3].price,
      },
      {
        order_id: orderInstances[4].id,
        product_id: productInstances[4].id,
        quantity: 1,
        price: productInstances[4].price,
      },
    ];
    await OrderItem.bulkCreate(orderItems, { validate: true, transaction });
    console.log("Order items seeded");

    const shipments = [
      {
        order_id: orderInstances[0].id,
        shipment_date: new Date("2024-12-05"),
        email: "alice.johnson@example.com",
        address: "123 Maple Street",
        carrier: "FedEx",
        tracking_number: "track001",
        delivery_date: new Date("2024-12-10"),
      },
      {
        order_id: orderInstances[1].id,
        shipment_date: new Date("2024-12-06"),
        email: "bob.smith@example.com",
        address: "456 Oak Avenue",
        carrier: "UPS",
        tracking_number: "track002",
        delivery_date: new Date("2024-12-12"),
      },
      {
        order_id: orderInstances[2].id,
        shipment_date: new Date("2024-12-07"),
        email: "charlie.brown@example.com",
        address: "789 Pine Lane",
        carrier: "DHL",
        tracking_number: "track003",
        delivery_date: new Date("2024-12-15"),
      },
      {
        order_id: orderInstances[3].id,
        shipment_date: new Date("2024-12-08"),
        email: "daisy.taylor@example.com",
        address: "135 Elm Street",
        carrier: "FedEx",
        tracking_number: "track004",
        delivery_date: new Date("2024-12-14"),
      },
      {
        order_id: orderInstances[4].id,
        shipment_date: new Date("2024-12-09"),
        email: "evan.williams@example.com",
        address: "246 Cedar Road",
        carrier: "USPS",
        tracking_number: "track005",
        delivery_date: new Date("2024-12-16"),
      },
    ];
    await Shipment.bulkCreate(shipments, { validate: true, transaction });
    console.log("Shipments seeded");

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
