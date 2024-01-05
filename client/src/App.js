import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Registration from "./pages/Registration";
import RegisterRestaurant from "./pages/RegisterRestaurant";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/registerrestaurant" element={<RegisterRestaurant />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/MyOrders" element={<MyOrders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
