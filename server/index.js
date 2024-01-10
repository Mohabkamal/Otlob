// express : node   framework
const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();
const port = 3000;
const db = require("./database");
const cors = require("cors");

const {
  insertRestaurant,
  insertCustomer,
  insertItem,
  insertOrder,
  getAllRestaurants,
  getAllItems,
  getAllCustomers,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getCustomerPassword,
  getCustomer,
  getRestaurantPassword,
  getItemsForRestaurantId
} = require("./dbFunctions.js");

app.use(cors());
app.use(express.json());

// Your API routes

// Query restaurants
app.get("/api/getAllRestaurants", (req, res) => {
  // Call the getAllRestaurants function
  getAllRestaurants((err, rows) => {
    if (err) {
      console.error("Error querying restaurants:", err.message);
      res.status(500).send("Error fetching restaurants");
    } else {
      // Respond to the client with the retrieved data
      res.json(rows);
    }
  });
});

// Insert restaurant
app.post("/api/insertRestaurant", (req, res) => {
  // Extract data from the request body
  const {
    name,
    address,
    password,
    opening_hours,
    closing_hours,
    delivery_radius,
    description,
    image_url,
    email,
  } = req.body;

  // Call the insertRestaurant function
  insertRestaurant(
    name,
    address,
    password,
    opening_hours,
    closing_hours,
    delivery_radius,
    description,
    image_url,
    email
  );

  // Respond to the client
  res.send("Restaurant inserted successfully");
});

// Insert customer
app.post("/api/insertCustomer", (req, res) => {
  // Extract data from the request body
  const { first_name, last_name, address, password, zip, email } = req.body;

  // Call the insertRestaurant function
  insertCustomer(first_name, last_name, address, password, zip, email);

  // Respond to the client
  res.send("Customer inserted successfully");
});

// Customer password check
app.post("/api/getCustomerPassword", (req, res) => {
  // Extract data from the request body
  const { email } = req.body;
  getCustomerPassword(email, (err, storedPassword) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ password: storedPassword });
    }
  });
});

// Restaurant password check
app.post("/api/getRestaurantPassword", (req, res) => {
  // Extract data from the request body
  const { email } = req.body;
  getRestaurantPassword(email, (err, storedPassword) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ password: storedPassword });
    }
  });
});

// Query specific customer
app.post("/api/getCustomer", (req, res) => {
  const { email } = req.body;
  getCustomer(email, (err, customer) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ customer });
    }
  });
});

// Query items for a specific restaurant
app.get("/api/getItemsForRestaurantId/:id", (req, res) => {
  const { id } = req.params;

  // Call the getItemsForRestaurant function
  getItemsForRestaurantId(id, (err, items) => {
    if (err) {
      console.error("Error querying items for restaurant:", err.message);
      res.status(500).send("Error fetching items for restaurant");
    } else {
      // Respond to the client with the retrieved items
      res.json(items);
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
