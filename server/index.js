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
} = require("./dbFunctions.js");

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Your API routes

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

app.post("/api/insertCustomer", (req, res) => {
  // Extract data from the request body
  const { first_name, last_name, address, password, zip, email} = req.body;

  // Call the insertRestaurant function
  insertCustomer(first_name, last_name, address, password, zip, email);

  // Respond to the client
  res.send("Customer inserted successfully");
});

//new
app.post("/api/getCustomerPassword", (req, res) => {
  // Extract data from the request body
  const {email, password} = req.body;
  //console.log(email, password)
  // Call the getCustomerPassword function
  //  pass = getCustomerPassword(email);

   //check if the 2 passwords are the same

  // Respond to the client
  res.send("Customer 123 successfully");
});

// Repeat similar routes for other functions



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
