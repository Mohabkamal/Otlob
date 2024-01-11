import { useCart } from "../CartContext/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState([]);
  const [customer, setCustomer] = useState(null);

  const userEmail = localStorage.getItem("userEmail");
  const RestaurantEmail = localStorage.getItem("RestaurantEmail");
  
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/getRestaurant",
          { email: RestaurantEmail }
        );
        console.log("response restaurant:" ,response.data.restaurant);
        setRestaurant(response.data.restaurant);
        console.log("restaurant data:", response.data.restaurant);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };
  
    fetchRestaurantData();
  }, [RestaurantEmail]);

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

  
  console.log("cart >> cart state",cart)
  if (!cart|| cart.length === 0) {
    return <p>Your cart is empty</p>;
  }

  const proceedToOrder = async () => {
    try {
      console.log("restaurant",restaurant);
      console.log("customer",customer)
      // Make an API call to insert the order
      const response = await axios.post('http://localhost:3000/api/insertOrder', {
        state:"Received",
        restaurant_id: restaurant.id, // Include restaurant ID
        customer_id: customer.id, // Include customer ID
        items_json: cart,
      });

      // After a successful order insertion, navigate to MyOrders page with the order ID
      navigate(`/myorders`);
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {console.log('Mapping items:', cart)}
      {cart.map((item) => (
        <div key={item.id}>
          <p>name: {item.name}</p>
          <p>quantity: {item.quantity}</p>
          <p>price: {item.price}</p>
        </div>
      ))}
      <button onClick={clearCart}>Clear Cart</button>

      <button onClick={proceedToOrder}>Proceed to Order</button>
    </div>
  );
}

export default Cart;
