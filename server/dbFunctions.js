const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("example.db");

// Insert a restaurant
const insertRestaurant = (
  name,
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
const insertCustomer = (first_name, last_name, address, password, zip, email) => {
  db.run(
    "INSERT INTO customers ( first_name, last_name, address, password, zip, email) VALUES ( ?, ?, ?, ?, ?, ?)",
    [first_name, last_name, address, password, zip, email],
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
const insertItem = (
  name,
  price,
  description,
  category,
  image_url,
  restaurant_id
) => {
  db.run(
    "INSERT INTO items ( name, price, description, category, image_url, restaurant_id) VALUES ( ?, ?, ?, ?, ?, ?)",
    [name, price, description, category, image_url, restaurant_id],
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
const insertOrder = (state, date, restaurant_id, customer_id) => {
  db.run(
    "INSERT INTO orders (state, date, restaurant_id, customer_id) VALUES (?, ?, ?, ?)",
    [state, date, restaurant_id, customer_id],
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
const getAllRestaurants = (callback) => {
  db.all("SELECT * FROM restaurants", (err, rows) => {
    if (err) {
      console.error("Error querying restaurants:", err.message);
      callback(err, null);
    } else {
      console.log("All restaurants:", rows);
      callback(null, rows);
    }
  });
};

const getAllItems = (callback) => {
  db.all("SELECT * FROM items", (err, rows) => {
    if (err) {
      console.error("Error querying items:", err.message);
      callback(err, null);
    } else {
      console.log("All Items:", rows);
      callback(null, rows);
    }
  });
};

const getAllCustomers = (callback) => {
  db.all("SELECT * FROM customers", (err, rows) => {
    if (err) {
      console.error("Error querying customers:", err.message);
      callback(err, null);
    } else {
      console.log("All customers:", rows);
      callback(null, rows);
    }
  });
};

const getAllOrders = (callback) => {
  db.all("SELECT * FROM orders", (err, rows) => {
    if (err) {
      console.error("Error querying orders:", err.message);
      callback(err, null);
    } else {
      console.log("All orders:", rows);
      callback(null, rows);
    }
  });
};
//error here
// Get customer password for specific email
const getCustomerPassword = (email) => {
  db.run("SELECT * FROM customers WHERE email = '?' ", [email], (err, rows) => {
    if (err) {
      console.error("Error querying Customers:", err.message);
      // callback(err, null);
    } else {
      console.log("Passwordxd:", rows);
      // callback(null , rows);
    }
    // console.log("Passwordxd:", rows.a);
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

module.exports = {
  insertRestaurant,
  insertCustomer,
  insertItem,
  insertOrder,
  getAllRestaurants,
  getAllItems,
  getAllCustomers,
  getAllOrders,
  deleteUserById,
};

// Perform operations
// insertOrder("123", "Johnggg Doe", "John Doe", "470", "123");
//getAllOrders();

// insertCustomer("alooo Doe", "Johnggg Doe", "addressDoe", "passssss", "470", "xdw@gmail.com");
//  getAllCustomers();

 getCustomerPassword("test22@");

//getAllRestaurants();
// Close the database connection
//db.close();
