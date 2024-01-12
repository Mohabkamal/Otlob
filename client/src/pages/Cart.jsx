import { useCart } from "../CartContext/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './Css/Cart.css';
function Cart() {
  const { cart, clearCart, addItem, removeItem } = useCart();
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
      const itemsJsonString = JSON.stringify(cart);

      const response = await axios.post('http://localhost:3000/api/insertOrder', {
        state:"Received",
        restaurant_id: restaurant.id,
        customer_id: customer.id, 
        items_json: itemsJsonString,
      });
      navigate(`/myorders`);
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items-container">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <p>name: {item.name}</p>
            <p>quantity: {item.quantity}</p>
            <p>price: {item.price}</p>
            <div className="item-control">
              <button className="cart-add" onClick={() => addItem(item)}>+</button>
              <button className="cart-remove" onClick={() => removeItem(item.id)}>-</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={clearCart} className="cart-button">Clear Cart</button>
      <button onClick={proceedToOrder} className="cart-button">Proceed to Order</button>
    </div>
  );
}

export default Cart;