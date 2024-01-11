import axios from "axios";
import{ useEffect, useState }  from "react";
import { useParams } from "react-router-dom";
import MenuCard from "../components/MenuCard.jsx";
import "./Css/Menu.css";
import Cart from "../pages/Cart.jsx";


function Menu() {

  const { id } = useParams();
  const [items, setItems] = useState([]);


 useEffect(() => {
    // Fetch items based on the restaurant ID
    axios
      .get(`http://localhost:3000/api/getItemsForRestaurantId/${id}`)
      .then((res) => {
        console.log(res.data, "Items for restaurant ID:", id);
        // console.log(res)
        if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          console.error(
            "Invalid data format for ITEMS:",
            res.data.items
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, [id]);

;

  return (
    <div className="menu-container">
      <div className="menu-items">
        <h2>Menu</h2>
        <div className="menu-items-grid">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="menu-cart">
      <Cart />
      </div>
    </div>
  );
}

export default Menu;