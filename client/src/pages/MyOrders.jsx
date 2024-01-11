import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyOrders() {
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/getCustomer",
          { email: userEmail } // Use userEmail from localStorage
        );
  
        const fetchedCustomer = response.data.customer;
  
        if (fetchedCustomer) {
          console.log("Customer data:", fetchedCustomer);
          setCustomer(fetchedCustomer);
        } else {
          console.log("Email not found in customers table");
          // Handle the case where the customer is not found
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
        // Handle other errors
      }
    };
  
    fetchCustomerData();
  }, [userEmail]);


  useEffect(() => {
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

    if (userEmail) {
      getAllOrders();
    }
  }, []);


  return (
    <div>
      <h3>Items:</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Name: {order.name}</p>
            <p>Status: {order.status}</p>
            <p>Items: {order.items_json}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyOrders;
