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
      image_url TEXT
    )
  `);

  // Create 'items' table
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT,
      restaurant_id INTEGER,
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
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
      zip INTEGER NOT NULL,
      email string NOT NULL
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
      FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    )
  `);
});

module.exports = db;
