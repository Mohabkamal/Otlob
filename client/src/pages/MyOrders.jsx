import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Css/MyOrders.css';
function MyOrders() {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/getCustomer",
          { email: userEmail } 
        );
  
        const fetchedCustomer = response.data.customer;
  
        if (fetchedCustomer) {
          console.log("Customer data:", fetchedCustomer);
          setCustomer(fetchedCustomer);
        } else {
          console.log("Email not found in customers table");
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
  
    fetchCustomerData();
  }, [userEmail]);

// Fetch all orders for the customer and sort them in descending order
  useEffect(() => {
    if (customer) {
      // Fetch all orders for the customer and sort them in descending order
      const getAllOrders = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/getCustomerOrders', {
            customer_id: customer.id,
          });

          const sortedOrders = response.data.orders.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });

          setOrders(sortedOrders);
        } catch (error) {
          console.error('Error fetching customer orders:', error);
        }
      };

      getAllOrders();
    }
  }, [customer]);
 
return (
  <div className="orders-container">
    {orders.map((order) => (
      <div key={order.id} className="order">
        <div className="order-info">
          <p>Order ID: {order.id}</p>
          <p>Restaurant ID: {order.restaurant_id}</p>
          <p>Status: {order.state}</p>
          <p>Date: {order.date}</p>
        </div>
        <div className="order-items">
          {order.items_json && order.items_json !== '[object Object]' ? (
            <div>
              <h4>Items:</h4>
              <ul>
                {JSON.parse(order.items_json).map((item) => (
                  <li key={item.id} className="item">
                    <p>Name: {item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="no-items">No items found for this order</p>
          )}
        </div>
        <div className="order-info">
          <p>Total Price: {order.total_price} $</p>
        </div>
      </div>
    ))}
  </div>
);
}

export default MyOrders;
