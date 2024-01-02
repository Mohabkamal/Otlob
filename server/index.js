// express : node framework
const express = require("express");
const sqlite3 = require("sqlite3");
const app = express();
const port = 3000;
const db = require("./database");

// Insert a restaurant
const insertRestaurant = (
  name,
  id,
  address,
  password,
  opening_hours,
  closing_hours,
  delivery_radius,
  description,
  image_url
) => {
  db.run(
    "INSERT INTO restaurants (name, id,address,password ,opening_hours,closing_hours,delivery_radius,description,image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      id,
      address,
      password,
      opening_hours,
      closing_hours,
      delivery_radius,
      description,
      image_url,
    ],
    (err) => {
      if (err) {
        console.error("Error inserting restaurant:", err.message);
      } else {
        console.log("Restaurant inserted successfully");
      }
    }
  );
};

//Insert a customer
const insertCustomer = (id, first_name, last_name, address, password, zip ) => {
  db.run(
    "INSERT INTO customers (id, first_name, last_name, address, password, zip) VALUES (?, ?, ?, ?, ?, ?)",
    [
      id, first_name, last_name, address, password, zip 
    ],
    (err) => {
      if (err) {
        console.error("Error inserting customer:", err.message);
      } else {
        console.log("Customer inserted successfully");
      }
    }
  );
};

//Insert an item
const insertItem = (id, name, price, description, category, image_url, restaurant_id ) => {
  db.run(
    "INSERT INTO items (id, name, price, description, category, image_url, restaurant_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      id, name, price, description, category, image_url, restaurant_id 
    ],
    (err) => {
      if (err) {
        console.error("Error inserting item:", err.message);
      } else {
        console.log("Item inserted successfully");
      }
    }
  );
};



//Insert an order
const insertOrder = (id, state, date, restaurant_id, customer_id) => {
  db.run(
    "INSERT INTO orders (id, state, date, restaurant_id, customer_id) VALUES (?, ?, ?, ?, ?)",
    [
      id, state, date, restaurant_id, customer_id 
    ],
    (err) => {
      if (err) {
        console.error("Error inserting order:", err.message);
      } else {
        console.log("Order inserted successfully");
      }
    }
  );
};



// Query all
const getAllRestaurants = () => {
  db.all("SELECT * FROM restaurants", (err, rows) => {
    if (err) {
      console.error("Error querying restaurants:", err.message);
    } else {
      console.log("All restaurants:", rows);
    }
  });
};

const getAllItems = () => {
  db.all("SELECT * FROM items", (err, rows) => {
    if (err) {
      console.error("Error querying items:", err.message);
    } else {
      console.log("All Items:", rows);
    }
  });
};

const getAllCustomers = () => {
  db.all("SELECT * FROM customers", (err, rows) => {
    if (err) {
      console.error("Error querying customers:", err.message);
    } else {
      console.log("All customers:", rows);
    }
  });
};

const getAllUsers = () => {
  db.all("SELECT * FROM orders", (err, rows) => {
    if (err) {
      console.error("Error querying orders:", err.message);
    } else {
      console.log("All orders:", rows);
    }
  });
};


// Update user by ID
const updateUserById = (id, newName) => {
  db.run("UPDATE users SET name = ? WHERE id = ?", [newName, id], (err) => {
    if (err) {
      console.error("Error updating user:", err.message);
    } else {
      console.log("User updated successfully");
    }
  });
};

// Delete user by ID
const deleteUserById = (id) => {
  db.run("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Error deleting user:", err.message);
    } else {
      console.log("User deleted successfully");
    }
  });
};

// Perform operations
insertOrder(
  "123",
  "Johnggg Doe",
  "John Doe",
  "470",
  "123"
);

getAllUsers();
// Close the database connection
db.close();
