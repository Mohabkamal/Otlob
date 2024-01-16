import { useCart } from "../CartContext/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './Css/Cart.css';
function Cart() {
  const { cart, clearCart, addItem, removeItem, total } = useCart();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [specialRequest, setSpecialRequest] = useState("");


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

      // eslint-disable-next-line
      const response = await axios.post('http://localhost:3000/api/insertOrder', {
        state:"Received",
        restaurant_id: restaurant.id,
        customer_id: customer.id, 
        items_json: itemsJsonString,
        total_price : total,
        special_request: specialRequest,
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
            <p>Name: {item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price} $</p>
            <div className="item-control">
              <button className="cart-add" onClick={() => addItem(item)}>+</button>
              <button className="cart-remove" onClick={() => removeItem(item.id)}>-</button>
            </div>
          </div>
        ))}
      </div>
      
      <label htmlFor="specialRequest" style={{ display: 'block', marginBottom: '8px' }}>
      Special Requests:
      </label>
      <input
        type="text"
        id="specialRequest"
        value={specialRequest}
        placeholder="Extra onions, etc...."
        onChange={(e) => setSpecialRequest(e.target.value)}
        style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}
      />


      <p>Total Price: ${total.toFixed(2)}</p>
      <button onClick={clearCart} className="cart-button">Clear Cart</button>
      <button onClick={proceedToOrder} className="cart-button">Proceed to Order</button>
    </div>
  );
}

export default Cart;