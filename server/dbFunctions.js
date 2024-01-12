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
  image_url,
  email
) => {
  db.run(
    "INSERT INTO restaurants (name,address,password ,opening_hours,closing_hours,delivery_radius,description,image_url, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      address,
      password,
      opening_hours,
      closing_hours,
      delivery_radius,
      description,
      image_url,
      email
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
const insertCustomer = (
  first_name,
  last_name,
  address,
  password,
  zip,
  email
) => {
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
const insertOrder = (state, date, restaurant_id, customer_id, items_json) => {
  db.run(
    "INSERT INTO orders (state, date, restaurant_id, customer_id, items_json) VALUES (?, ?, ?, ?, ?)",
    [state, date, restaurant_id, customer_id, items_json],
    (err) => {
      if (err) {
        console.error("Error inserting order:", err.message);
      } else {
        console.log("Order inserted successfully");
      }
    }
  );
};

// Query all Restaurants
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

// Get All orders
const getAllOrders = () => {
  db.all("SELECT * FROM orders", (err, rows) => {
    if (err) {
      console.error("Error querying orders:", err.message);
    } else {
      console.log("All orders:", rows);
    }
  });
};

// Get customer password for specific email
const getCustomerPassword = (email, callback) => {
  const query = "SELECT * FROM customers WHERE email = ?";

  db.all(query, [email], (err, rows) => {
    if (err) {
      console.error("Error querying Customers:", err.message);
      if (callback) {
        callback(err, null);
      }
    } else {
      if (rows.length > 0) {
        console.log("Password:", rows[0].password); // Assuming there is a 'password' column
        if (callback) {
          callback(null, rows[0].password);
        }
      } else {
        console.log("Email not found");
        if (callback) {
          callback(null, null);
        }
      }
    }
  });
};

// Get restaurant password for specific email
const getRestaurantPassword = (email, callback) => {
  const query = "SELECT * FROM restaurants WHERE email = ?";

  db.all(query, [email], (err, rows) => {
    if (err) {
      console.error("Error querying Restaurant:", err.message);
      if (callback) {
        callback(err, null);
      }
    } else {
      if (rows.length > 0) {
        console.log("Password:", rows[0].password); // Assuming there is a 'password' column
        if (callback) {
          callback(null, rows[0].password);
        }
      } else {
        console.log("Email not found");
        if (callback) {
          callback(null, null);
        }
      }
    }
  });
};


// Get specific customer
const getCustomer = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM customers WHERE email = ?";

    db.all(query, [email], (err, rows) => {
      if (err) {
        console.error("Error querying Customer:", err.message);
        reject(err);
      } else {
        console.log("Query executed:", query, [email]);
        
        if (rows.length > 0) {
          resolve(rows[0]);
        } else {
          console.log("Email not found in customers table");
          resolve(null);
        }
      }
    });
  });
};

// Get specific restaurant
const getRestaurant = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM restaurants WHERE email = ?";

    db.all(query, [email], (err, rows) => {
      if (err) {
        console.error("Error querying Restaurant:", err.message);
        reject(err);
      } else {
        if (rows.length > 0) {
          console.log("Restaurant found:", rows[0]);
          resolve(rows[0]);
        } else {
          console.log("Email not found in restaurants table");
          resolve(null);
        }
      }
    });
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

const getItemsForRestaurantId = (restaurantId, callback) => {
  const query = "SELECT * FROM items WHERE restaurant_id = ?";

  db.all(query, [restaurantId], (err, rows) => {
    if (err) {
      console.error("Error querying items for restaurant:", err.message);
      if (callback) {
        callback(err, null);
      }
    } else {
      console.log("Items for restaurant:", rows);
      if (callback) {
        callback(null, rows);
      }
    }
  });
};
//get all orders for a specific customer by id
const getCustomerOrders = (customer_id, callback) => {
  const query = "SELECT * FROM orders WHERE customer_id = ?";

  db.all(query, [customer_id], (err, rows) => {
    if (err) {
      console.error("Error querying orders for customer:", err.message);
      if (callback) {
        callback(err, null);
      }
    } else {
      console.log("Orders for customer:", rows);
      if (callback) {
        callback(null, rows);
      }
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
  getCustomerPassword,
  getCustomer,
  getRestaurantPassword,
  getItemsForRestaurantId,
  getRestaurant,
  getCustomerOrders,
};

// Perform operations
// insertOrder("123", "Johnggg Doe", "John Doe", "470", "123");
//getAllOrders();

// insertCustomer("alooo Doe", "Johnggg Doe", "addressDoe", "passssss", "470", "xdw@gmail.com");
//  getAllCustomers();

// insertOrder("preparing", "date", "tasty", "2", "8", "{dsfdfsdfsdfsdfsdfsdfs}")
 //getAllRestaurants()
 //getAllItems()
 //getCustomer("test11@")
//getRestaurant("rest@email.com")
//getCustomerPassword("test11@");
// insertRestaurant("hahaha", "hahaha", "hahaha", "hahaha", "hahaha", "hahaha", "hahaha", "hahaha", "hahaha")
 //getAllRestaurants();
// Close the database connection
//db.close();
// getAllOrders()

