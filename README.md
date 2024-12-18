# User Endpoints

## Create new user
Endpoint: POST /users/create
Description: Creates a new user with provided details
Use Case:
This endpoint is used to register new users in the system, ensuring all required user details are captured.
Request Body Example:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "phone": "987-654-3210",
  "address": "456 Elm Street, Metropolis"
}

## Delete user
Endpoint: DELETE /users/:id
Description: Deletes a user if they exist and do not have active orders.
Use Case: Ensures users cannot be deleted while they have active orders.
Response Example:
{ "result": 400, "error": "User cannot be deleted with an active order in place" }

# Order Items Endpoints

## Create an Order Item
Endpoint: POST /order-items/create
Description: Adds a product to an order with the specified quantity and price, ensuring stock availability.
Use Case:
This endpoint is used when adding items to an order, ensuring the requested quantity is available in stock. It also updates the product stock levels and maintains transactional consistency.
Request Body Example:
{
  "productId": 1,
  "quantity": 2,
  "orderId": 101,
  "price": 19.99
}

# Order Endpoints

## Get total revenue
Endpoint: GET /orders/total-revenue
Description: calculates total revenue by summing all values in the total_amount column
Use Case: For businesses to easily access their financial analytics

## Delete order
Endpoint: DELETE /order/:id 
Description: Checks that an order has not been shipped or delivered prior to deleting
Use Case: Validations in place to prevent an order being deleted 

Response Example:
{
  "result": 400,
  "error": "Order cannot be deleted as shipment is sent or delivered"
}

# Shipment Endpoints

## Update shipment
Endpoint: PUT /shipments/:id 
Description: Updates the details of a shipment by its ID.
Use Case: Modify shipment details such as carrier, tracking number, or shipped date.
Request Body Example:
{
  "carrier": "FedEx",
  "tracking_number": "123456789",
  "shipped_date": "2024-12-18"
}

## Update shipment status
Endpoint: PUT /shipments/:id/status
Description: Updates the status of a shipment and sets the associated order to inactive if the shipment is delivered.
Use Case: Automatically manages order status based on shipment status.

Request Body Example:
{
  "status": "delivered"
}


# Product Endpoints

## product quantity
Endpoint: GET /products/:name/quantity
Description: Retrieves the stock quantity of a product by its name.
Use Case: Determine product availability based on stock.

## Product order amount
Endpoint: GET /products/:id/order-count
Description: Retrieves the number of times a product has been ordered.
Use Case: Useful for analyzing product popularity
Request Example:
GET /products/order-count/21
Response Example:
{ "result": 200, "productId": "789", "orderCount": 42 }

