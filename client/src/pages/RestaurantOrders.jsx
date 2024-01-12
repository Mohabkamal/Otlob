
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Css/MyOrders.css';


function RestaurantOrders() {
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const RestaurantEmail = localStorage.getItem('RestaurantEmail');

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/getRestaurant",
          { email: RestaurantEmail } 
        );
  
        const fetchedRestaurant = response.data.restaurant;
  
        if (fetchedRestaurant) {
          console.log("Customer data:", fetchedRestaurant);
          setRestaurant(fetchedRestaurant);
        } else {
          console.log("Email not found in restaurant table");
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };
  
    fetchRestaurantData();
  }, [RestaurantEmail]);

// Fetch all orders for the Restaurant and sort them in descending order
  useEffect(() => {
    if (restaurant) {
      // Fetch all orders for the Restaurant and sort them in descending order
      const getAllOrders = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/getRestaurantOrders', {
            restaurant_id: restaurant.id,
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
  }, [restaurant,orders.state]);




   // Function to handle order status update
   const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.post('http://localhost:3000/api/updateOrderStatus', {
        orderId,
        newStatus,
      });

      // Update local state with the updated order status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, state: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
 
return (
  <div className="orders-container">
    {orders.map((order) => (
      <div key={order.id} className="order">
        <div className="order-info">
          <p>Order ID: {order.id}</p>
          <p>Customer ID: {order.customer_id}</p>
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
        <div className="order-actions">
            {order.state === 'Received' && (
              <>
                <button onClick={() => handleUpdateOrderStatus(order.id, 'Accepted')}>Accept</button>
                <button onClick={() => handleUpdateOrderStatus(order.id, 'Rejected')}>Reject</button>
              </>
            )}

            {order.state === 'Accepted' && (
              <button onClick={() => handleUpdateOrderStatus(order.id, 'Done')}>Order Done</button>
            )}
          </div>

      </div>
    ))}
  </div>
);
}

export default RestaurantOrders;
