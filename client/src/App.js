import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Registration from "./pages/Registration";
import RegisterRestaurant from "./pages/RegisterRestaurant";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import LoginRestaurant from "./pages/LoginRestaurant";
import Menu from "./pages/Menu";
import MyOrders from "./pages/MyOrders";
import Admin from "./pages/Admin";
import RestaurantOrders from "./pages/RestaurantOrders";
import { CartProvider } from './CartContext/CartContext.jsx';


function App() {
  return (
    <CartProvider>

   
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/registerrestaurant" element={<RegisterRestaurant />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginRestaurant" element={<LoginRestaurant />} />
          <Route path="/menu/:id" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/restaurantorders" element={<RestaurantOrders />} />
        </Routes>
      </Router>
    </div>
   </CartProvider>
   );
}

export default App;
