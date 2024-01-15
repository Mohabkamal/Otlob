const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("example.db");

// Create tables
db.serialize(() => {
  // Create 'restaurants' table
  db.run(`
    CREATE TABLE IF NOT EXISTS restaurants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      password TEXT NOT NULL,
      opening_hours TEXT NOT NULL,
      closing_hours TEXT NOT NULL,
      delivery_radius TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT,
      email TEXT NOT NULL unique
    )
  `);

  // Create 'items' table
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL check (category in ("Appetizer", "Main dish", "Dessert", " Drink")) , 
      image_url TEXT,
      restaurant_id INTEGER NOT NULL,
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE 
    )
  `);



  // Create 'customers' table
  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      address TEXT NOT NULL,
      password TEXT NOT NULL,
      zip INTEGER NOT NULL check (zip between 47057 and 47059),
      email TEXT NOT NULL unique
    )
  `);

  // Create 'orders' table


  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      state TEXT NOT NULL,
      date TEXT NOT NULL,
      restaurant_id INTEGER,
      customer_id INTEGER,
      items_json TEXT,
      total_price REAL NOT NULL,
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    )
  `);
  
  
});



module.exports = db;
